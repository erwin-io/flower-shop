import { Booking } from "./booking";
import { Users } from "./users";

export class BookingConversation {
  bookingConversationId: string;
  message: string;
  dateTime: Date;
  status: string;
  active: boolean;
  booking: Booking;
  fromUser: Users;
  toUser: Users;
}
