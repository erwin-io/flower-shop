import { Category } from "./Category";
import { File } from "./File";
import { ProductCollection } from "./ProductCollection";
import { ProductImage } from "./ProductImage";
export declare class Product {
    productId: string;
    sku: string | null;
    name: string;
    shortDesc: string;
    price: string;
    discountPrice: string;
    size: string;
    longDesc: string;
    active: boolean;
    category: Category;
    thumbnailFile: File;
    productCollections: ProductCollection[];
    productImages: ProductImage[];
}
