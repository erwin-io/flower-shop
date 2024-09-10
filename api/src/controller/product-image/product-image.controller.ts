import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  DELETE_SUCCESS,
  SAVING_SUCCESS,
  UPDATE_SUCCESS,
} from "src/common/constant/api-response.constant";
import { CreateProductImageDto } from "src/core/dto/product-image/product-image.create.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { ProductImage } from "src/db/entities/ProductImage";
import { ProductImageService } from "src/services/product-image.service";

@ApiTags("product-image")
@Controller("product-image")
export class ProductImageController {
  constructor(private readonly collectionService: ProductImageService) {}

  @Get("/:productImageId")
  //   @UseGuards(JwtAuthGuard)
  async getDetails(@Param("productImageId") productImageId: string) {
    const res = {} as ApiResponseModel<ProductImage>;
    try {
      res.data = await this.collectionService.getById(productImageId);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    const res: ApiResponseModel<{
      results: ProductImage[];
      total: number;
    }> = {} as any;
    try {
      res.data = await this.collectionService.getPagination(params);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("")
  //   @UseGuards(JwtAuthGuard)
  async addProduct(@Body() accessDto: CreateProductImageDto) {
    const res: ApiResponseModel<ProductImage> = {} as any;
    try {
      res.data = await this.collectionService.create(accessDto);
      res.success = true;
      res.message = `Product Collection ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/:collectionId")
  //   @UseGuards(JwtAuthGuard)
  async delete(@Param("collectionId") collectionId: string) {
    const res: ApiResponseModel<ProductImage> = {} as any;
    try {
      res.data = await this.collectionService.delete(collectionId);
      res.success = true;
      res.message = `Product Collection ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
