import { CreateProductDto } from "src/core/dto/product/product.create.dto";
import { UpdateProductDto } from "src/core/dto/product/product.update.dto";
import { Product } from "src/db/entities/Product";
import { Repository } from "typeorm";
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    getProductPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Product[];
        total: number;
    }>;
    getBySku(sku: any): Promise<Product>;
    create(dto: CreateProductDto): Promise<Product>;
    update(sku: any, dto: UpdateProductDto): Promise<Product>;
    delete(sku: any): Promise<Product>;
}
