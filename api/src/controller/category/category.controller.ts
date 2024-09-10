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
import { CreateCategoryDto } from "src/core/dto/category/category.create.dto";
import { UpdateCategoryDto } from "src/core/dto/category/category.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Category } from "src/db/entities/Category";
import { CategoryService } from "src/services/category.service";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/:categoryId")
  //   @UseGuards(JwtAuthGuard)
  async getDetails(@Param("categoryId") categoryId: string) {
    const res = {} as ApiResponseModel<Category>;
    try {
      res.data = await this.categoryService.getById(categoryId);
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
    const res: ApiResponseModel<{ results: Category[]; total: number }> =
      {} as any;
    try {
      res.data = await this.categoryService.getCategoryPagination(params);
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
  async create(@Body() accessDto: CreateCategoryDto) {
    const res: ApiResponseModel<Category> = {} as any;
    try {
      res.data = await this.categoryService.create(accessDto);
      res.success = true;
      res.message = `Category ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/:categoryId")
  //   @UseGuards(JwtAuthGuard)
  async update(
    @Param("categoryId") categoryId: string,
    @Body() dto: UpdateCategoryDto
  ) {
    const res: ApiResponseModel<Category> = {} as any;
    try {
      res.data = await this.categoryService.update(categoryId, dto);
      res.success = true;
      res.message = `Category ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/:categoryId")
  //   @UseGuards(JwtAuthGuard)
  async delete(@Param("categoryId") categoryId: string) {
    const res: ApiResponseModel<Category> = {} as any;
    try {
      res.data = await this.categoryService.delete(categoryId);
      res.success = true;
      res.message = `Category ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
