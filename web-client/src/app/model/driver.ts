import { Operator } from "./operator";
import { Users } from "./users";
export class Requirements {url?: string; fileName?: string; base64?: any};
export class Driver {
  driverId: string;
  driverCode: string;
  name: string;
  mobileNumber: string;
  address!: string;
  companyId!: string;
  licenseNumber!: string;
  userId: string;
  active: boolean;
  creditsBalance: string;
  earningsToday: string;
  totalEarnings: string;
  operator: Operator;
  user: Users;
  vehicleModel: string;
  vehicleMake: string;
  vehicleType: string;
  vehicleColor: string;
  requirements: Requirements[] = [];
  currentLocation: { latitude: string; longitude: string;};
  driverStatus: "INACTIVE" | "ACTIVE" | "SUSPENDED";
  vehicleStatus: "AVAILABLE" | "OCCUPIED" | "INMAINTENANCE" | "UNAVAILABLE"
}
