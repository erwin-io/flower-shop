import { CreateProductImageDto } from "src/core/dto/product-image/product-image.create.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { ProductImage } from "src/db/entities/ProductImage";
import { ProductImageService } from "src/services/product-image.service";
export declare class ProductImageController {
    private readonly collectionService;
    constructor(collectionService: ProductImageService);
    getDetails(productImageId: string): Promise<ApiResponseModel<ProductImage>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: ProductImage[];
        total: number;
    }>>;
    addProduct(accessDto: CreateProductImageDto): Promise<ApiResponseModel<ProductImage>>;
    delete(collectionId: string): Promise<ApiResponseModel<ProductImage>>;
}
