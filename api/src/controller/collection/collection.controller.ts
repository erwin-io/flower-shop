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
import { CreateCollectionDto } from "src/core/dto/collection/collection.create.dto";
import { UpdateCollectionDto } from "src/core/dto/collection/collection.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Collection } from "src/db/entities/Collection";
import { ProductCollection } from "src/db/entities/ProductCollection";
import { CollectionService } from "src/services/collection.service";

@ApiTags("collection")
@Controller("collection")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get("/:collectionId")
  //   @UseGuards(JwtAuthGuard)
  async getDetails(@Param("collectionId") collectionId: string) {
    const res = {} as ApiResponseModel<Collection>;
    try {
      res.data = await this.collectionService.getById(collectionId);
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
    const res: ApiResponseModel<{ results: Collection[]; total: number }> =
      {} as any;
    try {
      res.data = await this.collectionService.getCollectionPagination(params);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("addProduct")
  //   @UseGuards(JwtAuthGuard)
  async addProduct(@Body() accessDto: CreateCollectionDto) {
    const res: ApiResponseModel<Collection> = {} as any;
    try {
      res.data = await this.collectionService.create(accessDto);
      res.success = true;
      res.message = `Collection ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/:collectionId")
  //   @UseGuards(JwtAuthGuard)
  async update(
    @Param("collectionId") collectionId: string,
    @Body() dto: UpdateCollectionDto
  ) {
    const res: ApiResponseModel<Collection> = {} as any;
    try {
      res.data = await this.collectionService.update(collectionId, dto);
      res.success = true;
      res.message = `Collection ${UPDATE_SUCCESS}`;
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
    const res: ApiResponseModel<Collection> = {} as any;
    try {
      res.data = await this.collectionService.delete(collectionId);
      res.success = true;
      res.message = `Collection ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
