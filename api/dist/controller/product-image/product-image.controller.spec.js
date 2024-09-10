"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const product_image_controller_1 = require("./product-image.controller");
describe("ProductImageController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [product_image_controller_1.ProductImageController],
        }).compile();
        controller = module.get(product_image_controller_1.ProductImageController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=product-image.controller.spec.js.map