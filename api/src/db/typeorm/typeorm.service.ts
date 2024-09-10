import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, Inject } from "@nestjs/common";
import { Category } from "../entities/Category";
import { Collection } from "../entities/Collection";
import { CustomerUser } from "../entities/CustomerUser";
import { Product } from "../entities/Product";
import { ProductCollection } from "../entities/ProductCollection";
import { StaffAccess } from "../entities/StaffAccess";
import { StaffUser } from "../entities/StaffUser";
import { File } from "../entities/File";
import { ProductImage } from "../entities/ProductImage";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const ssl = this.config.get<string>("SSL");
    const config: TypeOrmModuleOptions = {
      type: "postgres",
      host: this.config.get<string>("DATABASE_HOST"),
      port: Number(this.config.get<number>("DATABASE_PORT")),
      database: this.config.get<string>("DATABASE_NAME"),
      username: this.config.get<string>("DATABASE_USER"),
      password: this.config.get<string>("DATABASE_PASSWORD"),
      entities: [
        StaffUser,
        StaffAccess,
        CustomerUser,
        Product,
        ProductImage,
        Category,
        Collection,
        ProductCollection,
        File
      ],
      synchronize: false, // never use TRUE in production!
      ssl: ssl.toLocaleLowerCase().includes("true"),
      extra: {
        timezone: "UTC", // or use "UTC" if you prefer UTC normalization
      },
    };
    if (config.ssl) {
      config.extra.ssl = {
        require: true,
        rejectUnauthorized: false,
      };
    }
    return config;
  }
}
