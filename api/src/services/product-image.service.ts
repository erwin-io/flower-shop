import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  COLLECTION_ERROR_NOT_FOUND,
  PRODUCT_COLLECTION_ERROR_NOT_FOUND,
} from "src/common/constant/collection.constant";
import { PRODUCT_ERROR_NOT_FOUND } from "src/common/constant/product.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateProductImageDto } from "src/core/dto/product-image/product-image.create.dto";
import { Collection } from "src/db/entities/Collection";
import { Product } from "src/db/entities/Product";
import { File } from "src/db/entities/File";
import { ProductImage } from "src/db/entities/ProductImage";
import { Repository } from "typeorm";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { v4 as uuid } from "uuid";
import { extname } from "path";

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    private firebaseProvoder: FirebaseProvider
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.productImageRepo.find({
        where: condition,
        skip,
        take,
        order,
      }),
      this.productImageRepo.count({
        where: condition,
      }),
    ]);
    return {
      results,
      total,
    };
  }

  async getById(productImageId) {
    const result = await this.productImageRepo.findOne({
      where: {
        productImageId,
      },
      relations: {
        product: {
          thumbnailFile: true,
        },
        file: true,
      },
    });
    if (!result) {
      throw Error(PRODUCT_COLLECTION_ERROR_NOT_FOUND);
    }
    return result;
  }

  async create(dto: CreateProductImageDto) {
    return await this.productImageRepo.manager.transaction(
      async (entityManager) => {
        const product = await entityManager.findOne(Product, {
          where: {
            sku: dto.sku,
            active: true,
          },
        });
        if (!product) {
          throw Error(PRODUCT_ERROR_NOT_FOUND);
        }
        const newGUID: string = uuid();
        const bucket = this.firebaseProvoder.app.storage().bucket();
        const bucketFile = bucket.file(
          `product/${dto.sku}/${newGUID}${extname(dto.fileName)}`
        );
        const img = Buffer.from(dto.data, "base64");
        let file = new File();
        await bucketFile.save(img).then(async () => {
          const url = await bucketFile.getSignedUrl({
            action: "read",
            expires: "03-09-2500",
          });
          file.fileName = dto.fileName;
          file.url = url[0];
          file.fileName = dto.fileName;
          file.guid = newGUID;
          file = await entityManager.save(File, file);
        });
        let productImage = new ProductImage();
        productImage.file = file;
        productImage.product = product;
        productImage = await entityManager.save(ProductImage, productImage);
        return productImage;
      }
    );
  }

  async delete(productImageId) {
    return await this.productImageRepo.manager.transaction(
      async (entityManager) => {
        const productImage = await entityManager.findOne(ProductImage, {
          where: {
            productImageId,
          },
          relations: {
            product: true,
            file: true,
          },
        });
        if (!productImage) {
          throw Error(PRODUCT_COLLECTION_ERROR_NOT_FOUND);
        }
        try {
          const bucket = this.firebaseProvoder.app.storage().bucket();
          const deleteFile = bucket.file(
            `product/${productImage.product?.sku}/${productImage.file?.guid}`
          );
          deleteFile.delete();
        } catch (ex) {
          console.log(ex);
        }
        return await entityManager.remove(ProductImage, productImage);
      }
    );
  }
}
