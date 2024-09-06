import { Users } from "./users";

export class Passenger {
  passengerId: string;
  passengerCode: string;
  name: string;
  mobileNumber: string;
  userId: string;
  active: boolean;
  user: Users;
  currentLocation: { latitude: string; longitude: string;};
}
