import { CreateCollectionDto } from "src/core/dto/collection/collection.create.dto";
import { UpdateCollectionDto } from "src/core/dto/collection/collection.update.dto";
import { Collection } from "src/db/entities/Collection";
import { Repository } from "typeorm";
export declare class CollectionService {
    private readonly collectionRepo;
    constructor(collectionRepo: Repository<Collection>);
    getCollectionPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Collection[];
        total: number;
    }>;
    getById(collectionId: any): Promise<Collection>;
    create(dto: CreateCollectionDto): Promise<Collection>;
    update(collectionId: any, dto: UpdateCollectionDto): Promise<Collection>;
    delete(collectionId: any): Promise<Collection>;
}
