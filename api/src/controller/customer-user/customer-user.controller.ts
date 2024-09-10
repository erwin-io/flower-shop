import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiParam } from "@nestjs/swagger";
import {
  SAVING_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} from "src/common/constant/api-response.constant";
import {
  ProfileResetPasswordDto,
  UpdateUserPasswordDto,
} from "src/core/dto/auth/reset-password.dto";
import { CreateCustomerUserDto } from "src/core/dto/customer-user/customer-user.create.dto";
import {
  UpdateCustomerUserDto,
  UpdateCustomerUserProfileDto,
} from "src/core/dto/customer-user/customer-user.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { CustomerUser } from "src/db/entities/CustomerUser";
import { CustomerUserService } from "src/services/customer-user.service";

@ApiTags("customer-user")
@Controller("customer-user")
// @ApiBearerAuth("jwt")
export class CustomerUserController {
  constructor(private readonly customerUserService: CustomerUserService) {}

  @Get("/:customerUserCode")
  //   @UseGuards(JwtAuthGuard)
  async getCustomerUserByCode(
    @Param("customerUserCode") customerUserCode: string
  ) {
    const res = {} as ApiResponseModel<CustomerUser>;
    try {
      res.data = await this.customerUserService.getCustomerUserByCode(
        customerUserCode
      );
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
  async getCustomerUserPagination(
    @Body() paginationParams: PaginationParamsDto
  ) {
    const res: ApiResponseModel<{ results: CustomerUser[]; total: number }> =
      {} as any;
    try {
      res.data = await this.customerUserService.getCustomerUserPagination(
        paginationParams
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/createCustomerUser")
  //   @UseGuards(JwtAuthGuard)
  async createCustomerUser(@Body() dto: CreateCustomerUserDto) {
    const res: ApiResponseModel<CustomerUser> = {} as any;
    try {
      res.data = await this.customerUserService.createCustomerUser(dto);
      res.success = true;
      res.message = `User  ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/updateCustomerUserProfile/:customerUserCode")
  //   @UseGuards(JwtAuthGuard)
  async updateCustomerUserProfile(
    @Param("customerUserCode") customerUserCode: string,
    @Body() dto: UpdateCustomerUserProfileDto
  ) {
    const res: ApiResponseModel<CustomerUser> = {} as any;
    try {
      res.data = await this.customerUserService.updateCustomerUserProfile(
        customerUserCode,
        dto
      );
      res.success = true;
      res.message = `User ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/updateCustomertUser/:customerUserCode")
  //   @UseGuards(JwtAuthGuard)
  async updateCustomertUser(
    @Param("usercustomerUserCodeCode") customerUserCode: string,
    @Body() dto: UpdateCustomerUserDto
  ) {
    const res: ApiResponseModel<CustomerUser> = {} as any;
    try {
      res.data = await this.customerUserService.updateCustomertUser(
        customerUserCode,
        dto
      );
      res.success = true;
      res.message = `User ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/:customerUserCode")
  //   @UseGuards(JwtAuthGuard)
  async deleteUser(@Param("customerUserCode") customerUserCode: string) {
    const res: ApiResponseModel<CustomerUser> = {} as any;
    try {
      res.data = await this.customerUserService.deleteUser(customerUserCode);
      res.success = true;
      res.message = `User ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
