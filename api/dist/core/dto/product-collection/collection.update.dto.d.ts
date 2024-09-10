import { DefaultCollectionDto } from "./product-collection-base.dto";
export declare class UpdateCollectionDto extends DefaultCollectionDto {
}
export declare class AddProductCollectionDto {
    collectionId: string;
    sku: string;
}
