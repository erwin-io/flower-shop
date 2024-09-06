import { BookingConversation } from "./booking-conversation";
import { Driver } from "./driver";
import { MapPoint } from "./map";
import { Passenger } from "./passenger";

export class Booking {
  bookingId: string;
  bookingCode: string;
  destinationAddress: string;
  destinationMap: MapPoint;
  pickupAddress: string;
  pickupMap: MapPoint;
  dateTimeBooked: Date;
  dateTimePickUp: Date;
  dateTimeArrivedPickup: Date;
  dateTimeArrivedDropOff: Date;
  bookingAmount: string;
  status: "PENDING" | "ACCEPTED" | "TOPICKUP" | "TRANSIT" | "COMPLETED" | "CANCELLED";
  vehicleType: string;
  rating: string;
  feedBack: string;
  paymentMethod: string;
  paymentAmount: string;
  paymentStatus: string;
  driver: Driver;
  passenger: Passenger;
  bookingConversations: BookingConversation[];
  bookingCreditCharge: string;
}
