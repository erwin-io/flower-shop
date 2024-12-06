import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  COLLECTION_ERROR_DUPLICATE,
  COLLECTION_ERROR_NOT_FOUND,
} from "src/common/constant/collection.constant";
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

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total, productCollections] = await Promise.all([
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
      this.collectionRepo
        .find({
          select: {
            collectionId: true,
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
          const collectionIds = res.map((x) => x.collectionId);
          // return collectionIds;
          const query = await this.collectionRepo.query(`
            SELECT c."CollectionId" as "collectionId",
            COUNT(pc."CollectionId")
            FROM dbo."Collection" c
            LEFT JOIN dbo."ProductCollection" pc ON c."CollectionId" = pc."CollectionId"
            WHERE pc."Active" = true AND c."CollectionId" IN(${collectionIds.join(
              ","
            )})
            GROUP BY c."CollectionId"`);
          return query as { collectionId: string; count: number }[];
        }),
    ]);
    return {
      results: results.map((x) => {
        x["productCollectionCount"] = productCollections.some(
          (pc) => x.collectionId.toString() === pc.collectionId.toString()
        )
          ? productCollections.find(
              (pc) => x.collectionId.toString() === pc.collectionId.toString()
            ).count
          : 0;
        return x;
      }) as any[],
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
        try {
          let collection = new Collection();
          collection.name = dto.name;
          collection.desc = dto.desc;
          collection.sequenceId = dto.sequenceId;
          collection = await entityManager.save(Collection, collection);
          return await entityManager.save(Collection, collection);
        } catch (ex) {
          if (ex.message.includes("duplicate")) {
            throw Error(COLLECTION_ERROR_DUPLICATE);
          } else {
            throw ex;
          }
        }
      }
    );
  }

  async update(collectionId, dto: UpdateCollectionDto) {
    return await this.collectionRepo.manager.transaction(
      async (entityManager) => {
        try {
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
          collection.sequenceId = dto.sequenceId;
          return await entityManager.save(Collection, collection);
        } catch (ex) {
          if (ex.message.includes("duplicate")) {
            throw Error(COLLECTION_ERROR_DUPLICATE);
          } else {
            throw ex;
          }
        }
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
