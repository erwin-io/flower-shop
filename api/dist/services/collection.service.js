"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collection_constant_1 = require("../common/constant/collection.constant");
const utils_1 = require("../common/utils/utils");
const Collection_1 = require("../db/entities/Collection");
const typeorm_2 = require("typeorm");
let CollectionService = class CollectionService {
    constructor(collectionRepo) {
        this.collectionRepo = collectionRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total, productCollections] = await Promise.all([
            this.collectionRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                skip,
                take,
                order,
            }),
            this.collectionRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
            this.collectionRepo
                .find({
                select: {
                    collectionId: true,
                },
                where: Object.assign(Object.assign({}, condition), { active: true }),
                skip,
                take,
                order,
            })
                .then(async (res) => {
                const collectionIds = res.map((x) => x.collectionId);
                const query = await this.collectionRepo.query(`
            SELECT c."CollectionId" as "collectionId",
            COUNT(pc."CollectionId")
            FROM dbo."Collection" c
            LEFT JOIN dbo."ProductCollection" pc ON c."CollectionId" = pc."CollectionId"
            WHERE pc."Active" = true AND c."CollectionId" IN(${collectionIds.join(",")})
            GROUP BY c."CollectionId"`);
                return query;
            }),
        ]);
        return {
            results: results.map((x) => {
                x["productCollectionCount"] = productCollections.some((pc) => x.collectionId.toString() === pc.collectionId.toString())
                    ? productCollections.find((pc) => x.collectionId.toString() === pc.collectionId.toString()).count
                    : 0;
                return x;
            }),
            total,
        };
    }
    async getById(collectionId) {
        const result = await this.collectionRepo.findOne({
            select: {
                name: true,
                collectionPages: true,
            },
            where: {
                collectionId,
                active: true,
            },
        });
        if (!result) {
            throw Error(collection_constant_1.COLLECTION_ERROR_NOT_FOUND);
        }
        return result;
    }
    async create(dto) {
        return await this.collectionRepo.manager.transaction(async (entityManager) => {
            try {
                let collection = new Collection_1.Collection();
                collection.name = dto.name;
                collection.desc = dto.desc;
                collection.sequenceId = dto.sequenceId;
                collection = await entityManager.save(Collection_1.Collection, collection);
                return await entityManager.save(Collection_1.Collection, collection);
            }
            catch (ex) {
                if (ex.message.includes("duplicate")) {
                    throw Error(collection_constant_1.COLLECTION_ERROR_DUPLICATE);
                }
                else {
                    throw ex;
                }
            }
        });
    }
    async update(collectionId, dto) {
        return await this.collectionRepo.manager.transaction(async (entityManager) => {
            try {
                const collection = await entityManager.findOne(Collection_1.Collection, {
                    where: {
                        collectionId,
                        active: true,
                    },
                });
                if (!collection) {
                    throw Error(collection_constant_1.COLLECTION_ERROR_NOT_FOUND);
                }
                collection.name = dto.name;
                collection.desc = dto.desc;
                collection.sequenceId = dto.sequenceId;
                return await entityManager.save(Collection_1.Collection, collection);
            }
            catch (ex) {
                if (ex.message.includes("duplicate")) {
                    throw Error(collection_constant_1.COLLECTION_ERROR_DUPLICATE);
                }
                else {
                    throw ex;
                }
            }
        });
    }
    async delete(collectionId) {
        return await this.collectionRepo.manager.transaction(async (entityManager) => {
            const collection = await entityManager.findOne(Collection_1.Collection, {
                where: {
                    collectionId,
                    active: true,
                },
            });
            if (!collection) {
                throw Error(collection_constant_1.COLLECTION_ERROR_NOT_FOUND);
            }
            collection.active = false;
            return await entityManager.save(Collection_1.Collection, collection);
        });
    }
};
CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Collection_1.Collection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map