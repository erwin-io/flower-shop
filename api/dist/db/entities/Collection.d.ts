import { File } from "./File";
import { ProductCollection } from "./ProductCollection";
export declare class Collection {
    collectionId: string;
    sequenceId: string;
    name: string;
    desc: string;
    active: boolean;
    thumbnailFile: File;
    productCollections: ProductCollection[];
}
