import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { File } from "./File";
import { ProductCollection } from "./ProductCollection";
import { ProductImage } from "./ProductImage";

@Index("Product_pkey", ["productId"], { unique: true })
@Entity("Product", { schema: "dbo" })
export class Product {
  @PrimaryGeneratedColumn({ type: "bigint", name: "ProductId" })
  productId: string;

  @Column("character varying", { name: "SKU", nullable: true })
  sku: string | null;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "ShortDesc" })
  shortDesc: string;

  @Column("numeric", { name: "Price", default: () => "0" })
  price: string;

  @Column("numeric", { name: "DiscountPrice", default: () => "0" })
  discountPrice: string;

  @Column("numeric", { name: "Size", default: () => "0" })
  size: string;

  @Column("character varying", { name: "LongDesc" })
  longDesc: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(() => File, (file) => file.products)
  @JoinColumn([{ name: "ThumbnailFileId", referencedColumnName: "fileId" }])
  thumbnailFile: File;

  @OneToMany(
    () => ProductCollection,
    (productCollection) => productCollection.product
  )
  productCollections: ProductCollection[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];
}
