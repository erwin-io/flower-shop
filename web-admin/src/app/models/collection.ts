import { File } from "././file";
import { ProductCollection } from "././product-collection";
export class Collection {
  collectionId: string;
  sequenceId: string;
  name: string;
  desc: string;
  active: boolean;
  thumbnailFile: File;
  productCollections: ProductCollection[];
}
