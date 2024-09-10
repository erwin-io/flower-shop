import { CreateCustomerUserDto } from "src/core/dto/customer-user/customer-user.create.dto";
import { UpdateCustomerUserDto, UpdateCustomerUserProfileDto } from "src/core/dto/customer-user/customer-user.update.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { CustomerUser } from "src/db/entities/CustomerUser";
import { Repository } from "typeorm";
export declare class CustomerUserService {
    private firebaseProvoder;
    private readonly customerUserRepo;
    constructor(firebaseProvoder: FirebaseProvider, customerUserRepo: Repository<CustomerUser>);
    getCustomerUserPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: CustomerUser[];
        total: number;
    }>;
    getCustomerUserByCode(customerUserCode: any): Promise<CustomerUser>;
    createCustomerUser(dto: CreateCustomerUserDto): Promise<CustomerUser>;
    updateCustomerUserProfile(customerUserCode: any, dto: UpdateCustomerUserProfileDto): Promise<CustomerUser>;
    updateCustomertUser(customerUserCode: any, dto: UpdateCustomerUserDto): Promise<CustomerUser>;
    deleteUser(customerUserCode: any): Promise<CustomerUser>;
}
