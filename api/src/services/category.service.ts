import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CATEGORY_ERROR_NOT_FOUND } from "src/common/constant/category.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateCategoryDto } from "src/core/dto/category/category.create.dto";
import { UpdateCategoryDto } from "src/core/dto/category/category.update.dto";
import { Category } from "src/db/entities/Category";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async getCategoryPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
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
    ]);
    return {
      results,
      total,
    };
  }

  async getById(categoryId) {
    const result = await this.categoryRepo.findOne({
      select: {
        name: true,
        categoryPages: true,
      } as any,
      where: {
        categoryId,
        active: true,
      },
    });
    if (!result) {
      throw Error(CATEGORY_ERROR_NOT_FOUND);
    }
    return result;
  }

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepo.manager.transaction(
      async (entityManager) => {
        let category = new Category();
        category.name = dto.name;
        category.desc = dto.desc;
        category = await entityManager.save(Category, category);
        return await entityManager.save(Category, category);
      }
    );
  }

  async update(categoryId, dto: UpdateCategoryDto) {
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
        category.name = dto.name;
        category.desc = dto.desc;
        return await entityManager.save(Category, category);
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
