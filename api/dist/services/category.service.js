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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_constant_1 = require("../common/constant/category.constant");
const utils_1 = require("../common/utils/utils");
const Category_1 = require("../db/entities/Category");
const Product_1 = require("../db/entities/Product");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total, categories] = await Promise.all([
            this.categoryRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                skip,
                take,
                order,
            }),
            this.categoryRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
            this.categoryRepo
                .find({
                select: {
                    categoryId: true,
                },
                where: Object.assign(Object.assign({}, condition), { active: true }),
                skip,
                take,
                order,
            })
                .then(async (res) => {
                const categoryIds = res.map((x) => x.categoryId);
                const queryRes = categoryIds.length > 0
                    ? await this.categoryRepo.query(`
            SELECT c."CategoryId" as "categoryId",
            COUNT(p."ProductId")
            FROM dbo."Category" c
            LEFT JOIN dbo."Product" p ON c."CategoryId" = p."CategoryId"
            WHERE p."Active" = true AND c."CategoryId" IN(${categoryIds.join(",")})
            GROUP BY c."CategoryId"`)
                    : [];
                return queryRes;
            }),
        ]);
        return {
            results: results.map((x) => {
                x["productCount"] = categories.some((pc) => x.categoryId.toString() === pc.categoryId.toString())
                    ? categories.find((pc) => x.categoryId.toString() === pc.categoryId.toString()).count
                    : 0;
                return x;
            }),
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
            throw Error(category_constant_1.CATEGORY_ERROR_NOT_FOUND);
        }
        const productCount = await this.categoryRepo.manager.count(Product_1.Product, {
            where: {
                category: {
                    categoryId
                }
            }
        });
        return Object.assign(Object.assign({}, result), { productCount });
    }
    async create(dto) {
        return await this.categoryRepo.manager.transaction(async (entityManager) => {
            try {
                let category = new Category_1.Category();
                category.name = dto.name;
                category.desc = dto.desc;
                category.sequenceId = dto.sequenceId;
                category = await entityManager.save(Category_1.Category, category);
                return await entityManager.save(Category_1.Category, category);
            }
            catch (ex) {
                if (ex.message.toLowerCase().includes("duplicate") &&
                    ex.message.toLowerCase().includes("sequenceid")) {
                    throw Error("Sequence already exist");
                }
                else if (ex.message.toLowerCase().includes("duplicate") &&
                    ex.message.toLowerCase().includes("name")) {
                    throw Error(category_constant_1.CATEGORY_ERROR_DUPLICATE);
                }
                else {
                    throw ex;
                }
            }
        });
    }
    async update(categoryId, dto) {
        return await this.categoryRepo.manager.transaction(async (entityManager) => {
            try {
                const category = await entityManager.findOne(Category_1.Category, {
                    where: {
                        categoryId,
                        active: true,
                    },
                });
                if (!category) {
                    throw Error(category_constant_1.CATEGORY_ERROR_NOT_FOUND);
                }
                category.name = dto.name;
                category.desc = dto.desc;
                category.sequenceId = dto.sequenceId;
                return await entityManager.save(Category_1.Category, category);
            }
            catch (ex) {
                if (ex.message.includes("duplicate")) {
                    throw Error(category_constant_1.CATEGORY_ERROR_DUPLICATE);
                }
                else {
                    throw ex;
                }
            }
        });
    }
    async delete(categoryId) {
        return await this.categoryRepo.manager.transaction(async (entityManager) => {
            const category = await entityManager.findOne(Category_1.Category, {
                where: {
                    categoryId,
                    active: true,
                },
            });
            if (!category) {
                throw Error(category_constant_1.CATEGORY_ERROR_NOT_FOUND);
            }
            category.active = false;
            return await entityManager.save(Category_1.Category, category);
        });
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Category_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map