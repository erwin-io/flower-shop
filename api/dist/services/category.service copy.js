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
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async getCategoryPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.categoryRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                skip,
                take,
                order,
            }),
            this.categoryRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
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
            },
            where: {
                categoryId,
                active: true,
            },
        });
        if (!result) {
            throw Error(category_constant_1.CATEGORY_ERROR_NOT_FOUND);
        }
        return result;
    }
    async create(dto) {
        return await this.categoryRepo.manager.transaction(async (entityManager) => {
            let category = new Category_1.Category();
            category.name = dto.name;
            category = await entityManager.save(Category_1.Category, category);
            return await entityManager.save(Category_1.Category, category);
        });
    }
    async update(categoryId, dto) {
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
            category.name = dto.name;
            return await entityManager.save(Category_1.Category, category);
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
//# sourceMappingURL=category.service%20copy.js.map