import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PRODUCT_ERROR_NOT_FOUND } from "src/common/constant/product.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateProductDto } from "src/core/dto/product/product.create.dto";
import { UpdateProductDto } from "src/core/dto/product/product.update.dto";
import { Category } from "src/db/entities/Category";
import { Product } from "src/db/entities/Product";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async getProductPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.productRepo.find({
        where: {
          ...condition,
          active: true,
        },
        relations: { 
          productImages: {
            file: true,
          },
          category: {
            thumbnailFile: true
          },
        },
        skip,
        take,
        order,
      }),
      this.productRepo.count({
        where: {
          ...condition,
          active: true,
        },
      }),
    ]);
    return {
      results,
      total,
    };
  }

  async getBySku(sku) {
    const result = await this.productRepo.findOne({
      where: {
        sku,
        active: true,
      },
      relations: {
        productImages: {
          file: true,
        },
        category: {
          thumbnailFile: true
        },
      }
    });
    if (!result) {
      throw Error(PRODUCT_ERROR_NOT_FOUND);
    }
    return result;
  }

  async create(dto: CreateProductDto) {
    return await this.productRepo.manager.transaction(async (entityManager) => {
      let product = new Product();
      product.name = dto.name;
      product.shortDesc = dto.shortDesc;
      product.longDesc = dto.longDesc;
      product.price = dto.price;
      product.discountPrice = dto.discountPrice;
      product.size = dto.size;
      const category = await entityManager.findOneBy(Category, {
        categoryId: dto.categoryId,
      });
      product.category = category;
      product = await entityManager.save(Product, product);
      product.sku = `P${generateIndentityCode(product.productId)}`;
      product = await entityManager.save(Product, product);
      product = await entityManager.findOne(Product, {
        where: {
          productId: product.productId,
        },
        relations: {
          productImages: {
            file: true,
          },
          category: {
            thumbnailFile: true
          },
        }
      });
      return product;
    });
  }

  async update(sku, dto: UpdateProductDto) {
    return await this.productRepo.manager.transaction(async (entityManager) => {
      let product = await entityManager.findOne(Product, {
        where: {
          sku,
          active: true,
        },
      });
      if (!product) {
        throw Error(PRODUCT_ERROR_NOT_FOUND);
      }
      product.name = dto.name;
      product.shortDesc = dto.shortDesc;
      product.longDesc = dto.longDesc;
      product.price = dto.price;
      product.discountPrice = dto.discountPrice;
      product.size = dto.size;
      const category = await entityManager.findOneBy(Category, {
        categoryId: dto.categoryId,
      });
      product.category = category;
      product = await entityManager.save(Product, product);
      product = await entityManager.findOne(Product, {
        where: {
          productId: product.productId,
        },
        relations: {
          productImages: {
            file: true,
          },
          category: {
            thumbnailFile: true
          },
        },
      });
      return product;
    });
  }

  async delete(sku) {
    return await this.productRepo.manager.transaction(async (entityManager) => {
      const product = await entityManager.findOne(Product, {
        where: {
          sku,
          active: true,
        },
      });
      if (!product) {
        throw Error(PRODUCT_ERROR_NOT_FOUND);
      }
      product.active = false;
      return await entityManager.save(Product, product);
    });
  }
}
