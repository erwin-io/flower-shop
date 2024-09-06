import { Access } from "./access.model";
import { Files } from "./files.model";

export class Users {
    userId: string;
    userName: string;
    accessGranted: boolean;
    active: boolean;
    userCode: string;
    userType: "PASSENGER" | "DRIVER" | "OPERATOR";
    access: Access = {} as any;
    userProfilePic: UserProfilePic;
  }

  export class UserProfilePic {
    userId: string;
    file: Files;
    user: Users;
  }
