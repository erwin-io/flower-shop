import { Category } from "././category";
import { File } from "././file";
import { ProductCollection } from "././product-collection";
import { ProductImage } from "././product-image";
export class Product {
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
