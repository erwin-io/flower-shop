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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_constant_1 = require("../common/constant/product.constant");
const utils_1 = require("../common/utils/utils");
const Category_1 = require("../db/entities/Category");
const Product_1 = require("../db/entities/Product");
const typeorm_2 = require("typeorm");
let ProductService = class ProductService {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async getProductPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.productRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
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
                where: Object.assign(Object.assign({}, condition), { active: true }),
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
            throw Error(product_constant_1.PRODUCT_ERROR_NOT_FOUND);
        }
        return result;
    }
    async create(dto) {
        return await this.productRepo.manager.transaction(async (entityManager) => {
            let product = new Product_1.Product();
            product.name = dto.name;
            product.shortDesc = dto.shortDesc;
            product.longDesc = dto.longDesc;
            product.price = dto.price;
            product.discountPrice = dto.discountPrice;
            product.size = dto.size;
            const category = await entityManager.findOneBy(Category_1.Category, {
                categoryId: dto.categoryId,
            });
            product.category = category;
            product = await entityManager.save(Product_1.Product, product);
            product.sku = `P${(0, utils_1.generateIndentityCode)(product.productId)}`;
            product = await entityManager.save(Product_1.Product, product);
            product = await entityManager.findOne(Product_1.Product, {
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
    async update(sku, dto) {
        return await this.productRepo.manager.transaction(async (entityManager) => {
            let product = await entityManager.findOne(Product_1.Product, {
                where: {
                    sku,
                    active: true,
                },
            });
            if (!product) {
                throw Error(product_constant_1.PRODUCT_ERROR_NOT_FOUND);
            }
            product.name = dto.name;
            product.shortDesc = dto.shortDesc;
            product.longDesc = dto.longDesc;
            product.price = dto.price;
            product.discountPrice = dto.discountPrice;
            product.size = dto.size;
            const category = await entityManager.findOneBy(Category_1.Category, {
                categoryId: dto.categoryId,
            });
            product.category = category;
            product = await entityManager.save(Product_1.Product, product);
            product = await entityManager.findOne(Product_1.Product, {
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
            const product = await entityManager.findOne(Product_1.Product, {
                where: {
                    sku,
                    active: true,
                },
            });
            if (!product) {
                throw Error(product_constant_1.PRODUCT_ERROR_NOT_FOUND);
            }
            product.active = false;
            return await entityManager.save(Product_1.Product, product);
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map