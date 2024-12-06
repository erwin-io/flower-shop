import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CATEGORY_ERROR_DUPLICATE,
  CATEGORY_ERROR_NOT_FOUND,
} from "src/common/constant/category.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateCategoryDto } from "src/core/dto/category/category.create.dto";
import { UpdateCategoryDto } from "src/core/dto/category/category.update.dto";
import { Category } from "src/db/entities/Category";
import { Product } from "src/db/entities/Product";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total, categories] = await Promise.all([
      this.categoryRepo.find({
        where: {
          ...condition,
          active: true,
        },
        skip,
        take,
        order,
      }),
      this.categoryRepo.count({
        where: {
          ...condition,
          active: true,
        },
      }),
      this.categoryRepo
        .find({
          select: {
            categoryId: true,
          },
          where: {
            ...condition,
            active: true,
          },
          skip,
          take,
          order,
        })
        .then(async (res) => {
          const categoryIds = res.map((x) => x.categoryId);
          // return collectionIds;
          const queryRes =
            categoryIds.length > 0
              ? await this.categoryRepo.query(`
            SELECT c."CategoryId" as "categoryId",
            COUNT(p."ProductId")
            FROM dbo."Category" c
            LEFT JOIN dbo."Product" p ON c."CategoryId" = p."CategoryId"
            WHERE p."Active" = true AND c."CategoryId" IN(${categoryIds.join(
              ","
            )})
            GROUP BY c."CategoryId"`)
              : [];
          return queryRes as { categoryId: string; count: number }[];
        }),
    ]);
    return {
      results: results.map((x) => {
        x["productCount"] = categories.some(
          (pc) => x.categoryId.toString() === pc.categoryId.toString()
        )
          ? categories.find(
              (pc) => x.categoryId.toString() === pc.categoryId.toString()
            ).count
          : 0;
        return x;
      }) as any[],
      total,
    };
  }

  async getById(categoryId) {
    const result = await this.categoryRepo.findOne({
      where: {
        categoryId,
        active: true,
      },
    });
    if (!result) {
      throw Error(CATEGORY_ERROR_NOT_FOUND);
    }
    const productCount = await this.categoryRepo.manager.count(Product, {
      where: {
        category: {
          categoryId
        }
      }
    })
    return {
      ...result,
      productCount
    };
  }

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepo.manager.transaction(
      async (entityManager) => {
        try {
          let category = new Category();
          category.name = dto.name;
          category.desc = dto.desc;
          category.sequenceId = dto.sequenceId;
          category = await entityManager.save(Category, category);
          return await entityManager.save(Category, category);
        } catch (ex) {
          if (
            ex.message.toLowerCase().includes("duplicate") &&
            ex.message.toLowerCase().includes("sequenceid")
          ) {
            throw Error("Sequence already exist");
          } else if (
            ex.message.toLowerCase().includes("duplicate") &&
            ex.message.toLowerCase().includes("name")
          ) {
            throw Error(CATEGORY_ERROR_DUPLICATE);
          } else {
            throw ex;
          }
        }
      }
    );
  }

  async update(categoryId, dto: UpdateCategoryDto) {
    return await this.categoryRepo.manager.transaction(
      async (entityManager) => {
        try {
          const category = await entityManager.findOne(Category, {
            where: {
              categoryId,
              active: true,
            },
          });
          if (!category) {
            throw Error(CATEGORY_ERROR_NOT_FOUND);
          }
          category.name = dto.name;
          category.desc = dto.desc;
          category.sequenceId = dto.sequenceId;
          return await entityManager.save(Category, category);
        } catch (ex) {
          if (ex.message.includes("duplicate")) {
            throw Error(CATEGORY_ERROR_DUPLICATE);
          } else {
            throw ex;
          }
        }
      }
    );
  }

  async delete(categoryId) {
    return await this.categoryRepo.manager.transaction(
      async (entityManager) => {
        const category = await entityManager.findOne(Category, {
          where: {
            categoryId,
            active: true,
          },
        });
        if (!category) {
          throw Error(CATEGORY_ERROR_NOT_FOUND);
        }
        category.active = false;
        return await entityManager.save(Category, category);
      }
    );
  }
}
