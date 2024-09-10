import { Category } from "./Category";
import { Collection } from "./Collection";
import { Product } from "./Product";
import { ProductImage } from "./ProductImage";
export declare class File {
    fileId: string;
    fileName: string;
    url: string | null;
    guid: string;
    categories: Category[];
    collections: Collection[];
    products: Product[];
    productImages: ProductImage[];
}
