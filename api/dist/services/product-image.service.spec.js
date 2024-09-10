"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const product_image_service_1 = require("./product-image.service");
describe("ProductImageService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [product_image_service_1.ProductImageService],
        }).compile();
        service = module.get(product_image_service_1.ProductImageService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=product-image.service.spec.js.map