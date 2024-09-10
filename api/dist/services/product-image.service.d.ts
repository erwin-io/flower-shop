import { CreateProductImageDto } from "src/core/dto/product-image/product-image.create.dto";
import { ProductImage } from "src/db/entities/ProductImage";
import { Repository } from "typeorm";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
export declare class ProductImageService {
    private readonly productImageRepo;
    private firebaseProvoder;
    constructor(productImageRepo: Repository<ProductImage>, firebaseProvoder: FirebaseProvider);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: ProductImage[];
        total: number;
    }>;
    getById(productImageId: any): Promise<ProductImage>;
    create(dto: CreateProductImageDto): Promise<ProductImage>;
    delete(productImageId: any): Promise<ProductImage>;
}
