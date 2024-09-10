import { Module } from "@nestjs/common";
import { ProductImageController } from "./product-image.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImage } from "src/db/entities/ProductImage";
import { ProductImageService } from "src/services/product-image.service";
import { HttpModule } from "@nestjs/axios";
import { FirebaseProviderModule } from "src/core/provider/firebase/firebase-provider.module";

@Module({
  imports: [
    FirebaseProviderModule,
    HttpModule,
    TypeOrmModule.forFeature([ProductImage]),
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService],
  exports: [ProductImageService],
})
export class ProductImageModule {}
