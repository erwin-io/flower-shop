import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { COLLECTION_ERROR_NOT_FOUND } from "src/common/constant/collection.constant";
import { PRODUCT_ERROR_NOT_FOUND } from "src/common/constant/product.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateCollectionDto } from "src/core/dto/collection/collection.create.dto";
import { UpdateCollectionDto } from "src/core/dto/collection/collection.update.dto";
import { Collection } from "src/db/entities/Collection";
import { Product } from "src/db/entities/Product";
import { ProductCollection } from "src/db/entities/ProductCollection";
import { Repository } from "typeorm";

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>
  ) {}

  async getCollectionPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.collectionRepo.find({
        where: {
          ...condition,
          active: true,
        },
        skip,
        take,
        order,
      }),
      this.collectionRepo.count({
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

  async getById(collectionId) {
    const result = await this.collectionRepo.findOne({
      select: {
        name: true,
        collectionPages: true,
      } as any,
      where: {
        collectionId,
        active: true,
      },
    });
    if (!result) {
      throw Error(COLLECTION_ERROR_NOT_FOUND);
    }
    return result;
  }

  async create(dto: CreateCollectionDto) {
    return await this.collectionRepo.manager.transaction(
      async (entityManager) => {
        let collection = new Collection();
        collection.name = dto.name;
        collection.desc = dto.desc;
        collection = await entityManager.save(Collection, collection);
        return await entityManager.save(Collection, collection);
      }
    );
  }

  async update(collectionId, dto: UpdateCollectionDto) {
    return await this.collectionRepo.manager.transaction(
      async (entityManager) => {
        const collection = await entityManager.findOne(Collection, {
          where: {
            collectionId,
            active: true,
          },
        });
        if (!collection) {
          throw Error(COLLECTION_ERROR_NOT_FOUND);
        }
        collection.name = dto.name;
        collection.desc = dto.desc;
        return await entityManager.save(Collection, collection);
      }
    );
  }

  async delete(collectionId) {
    return await this.collectionRepo.manager.transaction(
      async (entityManager) => {
        const collection = await entityManager.findOne(Collection, {
          where: {
            collectionId,
            active: true,
          },
        });
        if (!collection) {
          throw Error(COLLECTION_ERROR_NOT_FOUND);
        }
        collection.active = false;
        return await entityManager.save(Collection, collection);
      }
    );
  }
}
