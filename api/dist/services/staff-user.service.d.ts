import { CreateStaffUserDto } from "src/core/dto/staff-user/staff-user.create.dto";
import { UpdateStaffUserDto, UpdateStaffUserProfileDto } from "src/core/dto/staff-user/staff-user.update.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { StaffUser } from "src/db/entities/StaffUser";
import { Repository } from "typeorm";
export declare class StaffUserService {
    private firebaseProvoder;
    private readonly staffUserRepo;
    constructor(firebaseProvoder: FirebaseProvider, staffUserRepo: Repository<StaffUser>);
    getStaffUserPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: StaffUser[];
        total: number;
    }>;
    getStaffUserByCode(staffUserCode: any): Promise<StaffUser>;
    createStaffUsers(dto: CreateStaffUserDto): Promise<StaffUser>;
    updateStaffUserProfile(staffUserCode: any, dto: UpdateStaffUserProfileDto): Promise<StaffUser>;
    updateStaffUser(staffUserCode: any, dto: UpdateStaffUserDto): Promise<StaffUser>;
    deleteUser(staffUserCode: any): Promise<StaffUser>;
}
