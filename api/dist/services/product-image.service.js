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
exports.ProductImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collection_constant_1 = require("../common/constant/collection.constant");
const product_constant_1 = require("../common/constant/product.constant");
const utils_1 = require("../common/utils/utils");
const Product_1 = require("../db/entities/Product");
const File_1 = require("../db/entities/File");
const ProductImage_1 = require("../db/entities/ProductImage");
const typeorm_2 = require("typeorm");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const uuid_1 = require("uuid");
const path_1 = require("path");
let ProductImageService = class ProductImageService {
    constructor(productImageRepo, firebaseProvoder) {
        this.productImageRepo = productImageRepo;
        this.firebaseProvoder = firebaseProvoder;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
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
            throw Error(collection_constant_1.PRODUCT_COLLECTION_ERROR_NOT_FOUND);
        }
        return result;
    }
    async create(dto) {
        return await this.productImageRepo.manager.transaction(async (entityManager) => {
            const product = await entityManager.findOne(Product_1.Product, {
                where: {
                    sku: dto.sku,
                    active: true,
                },
            });
            if (!product) {
                throw Error(product_constant_1.PRODUCT_ERROR_NOT_FOUND);
            }
            const newGUID = (0, uuid_1.v4)();
            const bucket = this.firebaseProvoder.app.storage().bucket();
            const bucketFile = bucket.file(`product/${dto.sku}/${newGUID}${(0, path_1.extname)(dto.fileName)}`);
            const img = Buffer.from(dto.data, "base64");
            let file = new File_1.File();
            await bucketFile.save(img).then(async () => {
                const url = await bucketFile.getSignedUrl({
                    action: "read",
                    expires: "03-09-2500",
                });
                file.fileName = dto.fileName;
                file.url = url[0];
                file.fileName = dto.fileName;
                file.guid = newGUID;
                file = await entityManager.save(File_1.File, file);
            });
            let productImage = new ProductImage_1.ProductImage();
            productImage.file = file;
            productImage.product = product;
            productImage = await entityManager.save(ProductImage_1.ProductImage, productImage);
            return productImage;
        });
    }
    async delete(productImageId) {
        return await this.productImageRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            const productImage = await entityManager.findOne(ProductImage_1.ProductImage, {
                where: {
                    productImageId,
                },
                relations: {
                    product: true,
                    file: true,
                },
            });
            if (!productImage) {
                throw Error(collection_constant_1.PRODUCT_COLLECTION_ERROR_NOT_FOUND);
            }
            try {
                const bucket = this.firebaseProvoder.app.storage().bucket();
                const deleteFile = bucket.file(`product/${(_a = productImage.product) === null || _a === void 0 ? void 0 : _a.sku}/${(_b = productImage.file) === null || _b === void 0 ? void 0 : _b.guid}`);
                deleteFile.delete();
            }
            catch (ex) {
                console.log(ex);
            }
            return await entityManager.remove(ProductImage_1.ProductImage, productImage);
        });
    }
};
ProductImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ProductImage_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        firebase_provider_1.FirebaseProvider])
], ProductImageService);
exports.ProductImageService = ProductImageService;
//# sourceMappingURL=product-image.service.js.map