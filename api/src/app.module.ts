import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./db/typeorm/typeorm.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./controller/auth/auth.module";
import * as Joi from "@hapi/joi";
import { getEnvPath } from "./common/utils/utils";
import { CustomerUserModule } from "./controller/customer-user/customer-user.module";
import { StaffAccessModule } from "./controller/staff-access/staff-access.module";
import { FirebaseProviderModule } from "./core/provider/firebase/firebase-provider.module";
import { StaffUserModule } from "./controller/staff-user/staff-user.module";
import { CategoryModule } from "./controller/category/category.module";
import { CollectionModule } from "./controller/collection/collection.module";
import { ProductModule } from "./controller/product/product.module";
import { ProductCollection } from "./db/entities/ProductCollection";
import { ProductImageModule } from "./controller/product-image/product-image.module";
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    FirebaseProviderModule,
    StaffUserModule,
    StaffAccessModule,
    CustomerUserModule,
    CategoryModule,
    CollectionModule,
    ProductModule,
    ProductCollection,
    ProductImageModule
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {}
