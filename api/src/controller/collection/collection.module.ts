import { Module } from "@nestjs/common";
import { CollectionController } from "./collection.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Collection } from "src/db/entities/Collection";
import { CollectionService } from "src/services/collection.service";

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
