import { CreateCollectionDto } from "src/core/dto/collection/collection.create.dto";
import { UpdateCollectionDto } from "src/core/dto/collection/collection.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Collection } from "src/db/entities/Collection";
import { CollectionService } from "src/services/collection.service";
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    getDetails(collectionId: string): Promise<ApiResponseModel<Collection>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Collection[];
        total: number;
    }>>;
    addProduct(accessDto: CreateCollectionDto): Promise<ApiResponseModel<Collection>>;
    update(collectionId: string, dto: UpdateCollectionDto): Promise<ApiResponseModel<Collection>>;
    delete(collectionId: string): Promise<ApiResponseModel<Collection>>;
}
