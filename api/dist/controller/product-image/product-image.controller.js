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
exports.ProductImageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const product_image_create_dto_1 = require("../../core/dto/product-image/product-image.create.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const product_image_service_1 = require("../../services/product-image.service");
let ProductImageController = class ProductImageController {
    constructor(collectionService) {
        this.collectionService = collectionService;
    }
    async getDetails(productImageId) {
        const res = {};
        try {
            res.data = await this.collectionService.getById(productImageId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getPaginated(params) {
        const res = {};
        try {
            res.data = await this.collectionService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async addProduct(accessDto) {
        const res = {};
        try {
            res.data = await this.collectionService.create(accessDto);
            res.success = true;
            res.message = `Product Collection ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(collectionId) {
        const res = {};
        try {
            res.data = await this.collectionService.delete(collectionId);
            res.success = true;
            res.message = `Product Collection ${api_response_constant_1.DELETE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
};
__decorate([
    (0, common_1.Get)("/:productImageId"),
    __param(0, (0, common_1.Param)("productImageId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_image_create_dto_1.CreateProductImageDto]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Delete)("/:collectionId"),
    __param(0, (0, common_1.Param)("collectionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "delete", null);
ProductImageController = __decorate([
    (0, swagger_1.ApiTags)("product-image"),
    (0, common_1.Controller)("product-image"),
    __metadata("design:paramtypes", [product_image_service_1.ProductImageService])
], ProductImageController);
exports.ProductImageController = ProductImageController;
//# sourceMappingURL=product-image.controller.js.map