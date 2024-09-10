import { DefaultCustomerUserDto } from "./customer-user-base.dto";
export declare class UpdateCustomerUserDto extends DefaultCustomerUserDto {
    accessCode: string;
}
export declare class UpdateCustomerUserProfileDto extends DefaultCustomerUserDto {
    userProfilePic: any;
}
