import { AddProductCollectionDto } from "src/core/dto/collection/collection.update.dto";
import { ProductCollection } from "src/db/entities/ProductCollection";
import { Repository } from "typeorm";
export declare class CollectionService {
    private readonly collectionRepo;
    constructor(collectionRepo: Repository<ProductCollection>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: ProductCollection[];
        total: number;
    }>;
    getById(productCollectionId: any): Promise<ProductCollection>;
    create(dto: AddProductCollectionDto): Promise<ProductCollection>;
    delete(productCollectionId: any): Promise<ProductCollection>;
}
