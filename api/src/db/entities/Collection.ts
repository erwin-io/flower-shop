import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { File } from "./File";
import { ProductCollection } from "./ProductCollection";

@Index("Collection_pkey", ["collectionId"], { unique: true })
@Entity("Collection", { schema: "dbo" })
export class Collection {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CollectionId" })
  collectionId: string;

  @Column("bigint", { name: "SequenceId", default: () => "0" })
  sequenceId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Desc" })
  desc: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => File, (file) => file.collections)
  @JoinColumn([{ name: "ThumbnailFileId", referencedColumnName: "fileId" }])
  thumbnailFile: File;

  @OneToMany(
    () => ProductCollection,
    (productCollection) => productCollection.collection
  )
  productCollections: ProductCollection[];
}
