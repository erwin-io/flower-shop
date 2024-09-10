import { CreateProductDto } from "src/core/dto/product/product.create.dto";
import { UpdateProductDto } from "src/core/dto/product/product.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Product } from "src/db/entities/Product";
import { ProductService } from "src/services/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getDetails(sku: string): Promise<ApiResponseModel<Product>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Product[];
        total: number;
    }>>;
    create(accessDto: CreateProductDto): Promise<ApiResponseModel<Product>>;
    update(sku: string, dto: UpdateProductDto): Promise<ApiResponseModel<Product>>;
    delete(sku: string): Promise<ApiResponseModel<Product>>;
}
