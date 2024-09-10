import {
  columnDefToTypeORMCondition,
  compare,
  generateIndentityCode,
  getFullName,
  hash,
} from "../common/utils/utils";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import moment from "moment";
import { extname } from "path";
import { LOGIN_ERROR_PASSWORD_INCORRECT } from "src/common/constant/auth-error.constant";
import { USER_ERROR_USER_NOT_FOUND } from "src/common/constant/user-error.constant";
import {
  ProfileResetPasswordDto,
  UpdateUserPasswordDto,
} from "src/core/dto/auth/reset-password.dto";
import { CreateCustomerUserDto } from "src/core/dto/customer-user/customer-user.create.dto";
import {
  UpdateCustomerUserDto,
  UpdateCustomerUserProfileDto,
} from "src/core/dto/customer-user/customer-user.update.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { CustomerUser } from "src/db/entities/CustomerUser";
import { In, Repository } from "typeorm";
import { v4 as uuid } from "uuid";

@Injectable()
export class CustomerUserService {
  constructor(
    private firebaseProvoder: FirebaseProvider,
    @InjectRepository(CustomerUser)
    private readonly customerUserRepo: Repository<CustomerUser>
  ) {}

  async getCustomerUserPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);
    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.customerUserRepo.find({
        where: {
          ...condition,
          active: true,
        },
        relations: {},
        skip,
        take,
        order,
      }),
      this.customerUserRepo.count({
        where: {
          ...condition,
          active: true,
        },
      }),
    ]);
    return {
      results: results.map((x) => {
        delete x.password;
        return x;
      }),
      total,
    };
  }

  async getCustomerUserByCode(customerUserCode) {
    const res = await this.customerUserRepo.findOne({
      where: {
        customerUserCode,
        active: true,
      },
      relations: {},
    });

    if (!res) {
      throw Error(USER_ERROR_USER_NOT_FOUND);
    }
    if (res.password) delete res.password;
    return res;
  }

  async createCustomerUser(dto: CreateCustomerUserDto) {
    return await this.customerUserRepo.manager.transaction(
      async (entityManager) => {
        let customerUser = new CustomerUser();
        customerUser.email = dto.email;
        customerUser.password = await hash(dto.password);

        customerUser.name = dto.name ?? "";
        customerUser.email = dto.email;
        customerUser.currentOtp = "0";
        customerUser.isVerifiedUser = true;
        customerUser = await entityManager.save(CustomerUser, customerUser);
        customerUser.customerUserCode = generateIndentityCode(
          customerUser.customerUserId
        );
        customerUser = await entityManager.save(CustomerUser, customerUser);
        customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserCode: customerUser.customerUserCode,
            active: true,
          },
          relations: {},
        });
        delete customerUser.password;
        return customerUser;
      }
    );
  }

  async updateCustomerUserProfile(
    customerUserCode,
    dto: UpdateCustomerUserProfileDto
  ) {
    return await this.customerUserRepo.manager.transaction(
      async (entityManager) => {
        let customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserCode,
            active: true,
          },
          relations: {},
        });

        if (!customerUser) {
          throw Error(USER_ERROR_USER_NOT_FOUND);
        }

        customerUser.name = dto.name ?? "";
        customerUser.email = dto.email;
        customerUser = await entityManager.save(CustomerUser, customerUser);

        customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserCode,
            active: true,
          },
          relations: {},
        });
        delete customerUser.password;
        return customerUser;
      }
    );
  }

  async updateCustomertUser(customerUserCode, dto: UpdateCustomerUserDto) {
    return await this.customerUserRepo.manager.transaction(
      async (entityManager) => {
        let customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserCode,
            active: true,
          },
          relations: {},
        });

        if (!customerUser) {
          throw Error(USER_ERROR_USER_NOT_FOUND);
        }

        customerUser.name = dto.name;
        customerUser.email = dto.email;
        customerUser = await entityManager.save(CustomerUser, customerUser);
        customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserCode,
            active: true,
          },
          relations: {},
        });
        delete customerUser.password;
        return customerUser;
      }
    );
  }

  async deleteUser(customerUserCode) {
    return await this.customerUserRepo.manager.transaction(
      async (entityManager) => {
        let customerUser = await entityManager.findOne(CustomerUser, {
          where: {
            customerUserCode,
            active: true,
          },
          relations: {},
        });

        if (!customerUser) {
          throw Error(USER_ERROR_USER_NOT_FOUND);
        }

        customerUser.active = false;
        customerUser = await entityManager.save(CustomerUser, customerUser);
        delete customerUser.password;
        return customerUser;
      }
    );
  }
}
