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
import { CreateProductDto } from "src/core/dto/product/product.create.dto";
import { UpdateProductDto } from "src/core/dto/product/product.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Product } from "src/db/entities/Product";
import { ProductService } from "src/services/product.service";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/:sku")
  //   @UseGuards(JwtAuthGuard)
  async getDetails(@Param("sku") sku: string) {
    const res = {} as ApiResponseModel<Product>;
    try {
      res.data = await this.productService.getBySku(sku);
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
    const res: ApiResponseModel<{ results: Product[]; total: number }> =
      {} as any;
    try {
      res.data = await this.productService.getProductPagination(params);
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
  async create(@Body() accessDto: CreateProductDto) {
    const res: ApiResponseModel<Product> = {} as any;
    try {
      res.data = await this.productService.create(accessDto);
      res.success = true;
      res.message = `Product ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/:sku")
  //   @UseGuards(JwtAuthGuard)
  async update(@Param("sku") sku: string, @Body() dto: UpdateProductDto) {
    const res: ApiResponseModel<Product> = {} as any;
    try {
      res.data = await this.productService.update(sku, dto);
      res.success = true;
      res.message = `Product ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/:sku")
  //   @UseGuards(JwtAuthGuard)
  async delete(@Param("sku") sku: string) {
    const res: ApiResponseModel<Product> = {} as any;
    try {
      res.data = await this.productService.delete(sku);
      res.success = true;
      res.message = `Product ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
