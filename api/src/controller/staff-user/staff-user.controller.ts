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
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { CreateStaffUserDto } from "src/core/dto/staff-user/staff-user.create.dto";
import {
  UpdateStaffUserDto,
  UpdateStaffUserProfileDto,
} from "src/core/dto/staff-user/staff-user.update.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { StaffUser } from "src/db/entities/StaffUser";
import { StaffUserService } from "src/services/staff-user.service";

@ApiTags("staff-user")
@Controller("staff-user")
// @ApiBearerAuth("jwt")
export class StaffUserController {
  constructor(private readonly staffUserService: StaffUserService) {}

  @Get("/:staffUserCode")
  //   @UseGuards(JwtAuthGuard)
  async getStaffUserByCode(@Param("staffUserCode") staffUserCode: string) {
    const res = {} as ApiResponseModel<StaffUser>;
    try {
      res.data = await this.staffUserService.getStaffUserByCode(staffUserCode);
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
  async getStaffUserPagination(@Body() paginationParams: PaginationParamsDto) {
    const res: ApiResponseModel<{ results: StaffUser[]; total: number }> =
      {} as any;
    try {
      res.data = await this.staffUserService.getStaffUserPagination(
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

  @Post("/createClientUser")
  //   @UseGuards(JwtAuthGuard)
  async createClientUser(@Body() dto: CreateStaffUserDto) {
    const res: ApiResponseModel<StaffUser> = {} as any;
    try {
      res.data = await this.staffUserService.createStaffUsers(dto);
      res.success = true;
      res.message = `User  ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/updateStaffUserProfile/:staffUserCode")
  //   @UseGuards(JwtAuthGuard)
  async updateStaffUserProfile(
    @Param("staffUserCode") staffUserCode: string,
    @Body() dto: UpdateStaffUserProfileDto
  ) {
    const res: ApiResponseModel<StaffUser> = {} as any;
    try {
      res.data = await this.staffUserService.updateStaffUserProfile(
        staffUserCode,
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

  @Put("/updateStaffUser/:staffUserCode")
  //   @UseGuards(JwtAuthGuard)
  async updateStaffUser(
    @Param("userstaffUserCodeCode") staffUserCode: string,
    @Body() dto: UpdateStaffUserDto
  ) {
    const res: ApiResponseModel<StaffUser> = {} as any;
    try {
      res.data = await this.staffUserService.updateStaffUser(
        staffUserCode,
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

  @Delete("/:staffUserCode")
  //   @UseGuards(JwtAuthGuard)
  async deleteUser(@Param("staffUserCode") staffUserCode: string) {
    const res: ApiResponseModel<StaffUser> = {} as any;
    try {
      res.data = await this.staffUserService.deleteUser(staffUserCode);
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
