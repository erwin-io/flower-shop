import { CreateCustomerUserDto } from "src/core/dto/customer-user/customer-user.create.dto";
import { UpdateCustomerUserDto, UpdateCustomerUserProfileDto } from "src/core/dto/customer-user/customer-user.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { CustomerUser } from "src/db/entities/CustomerUser";
import { CustomerUserService } from "src/services/customer-user.service";
export declare class CustomerUserController {
    private readonly customerUserService;
    constructor(customerUserService: CustomerUserService);
    getCustomerUserByCode(customerUserCode: string): Promise<ApiResponseModel<CustomerUser>>;
    getCustomerUserPagination(paginationParams: PaginationParamsDto): Promise<ApiResponseModel<{
        results: CustomerUser[];
        total: number;
    }>>;
    createCustomerUser(dto: CreateCustomerUserDto): Promise<ApiResponseModel<CustomerUser>>;
    updateCustomerUserProfile(customerUserCode: string, dto: UpdateCustomerUserProfileDto): Promise<ApiResponseModel<CustomerUser>>;
    updateCustomertUser(customerUserCode: string, dto: UpdateCustomerUserDto): Promise<ApiResponseModel<CustomerUser>>;
    deleteUser(customerUserCode: string): Promise<ApiResponseModel<CustomerUser>>;
}
