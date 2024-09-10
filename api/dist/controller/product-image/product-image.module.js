"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageModule = void 0;
const common_1 = require("@nestjs/common");
const product_image_controller_1 = require("./product-image.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ProductImage_1 = require("../../db/entities/ProductImage");
const product_image_service_1 = require("../../services/product-image.service");
const axios_1 = require("@nestjs/axios");
const firebase_provider_module_1 = require("../../core/provider/firebase/firebase-provider.module");
let ProductImageModule = class ProductImageModule {
};
ProductImageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            firebase_provider_module_1.FirebaseProviderModule,
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([ProductImage_1.ProductImage]),
        ],
        controllers: [product_image_controller_1.ProductImageController],
        providers: [product_image_service_1.ProductImageService],
        exports: [product_image_service_1.ProductImageService],
    })
], ProductImageModule);
exports.ProductImageModule = ProductImageModule;
//# sourceMappingURL=product-image.module.js.map