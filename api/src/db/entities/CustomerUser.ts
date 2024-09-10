import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("CustomerUser_pkey", ["customerUserId"], { unique: true })
@Entity("CustomerUser", { schema: "dbo" })
export class CustomerUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "CustomerUserId" })
  customerUserId: string;

  @Column("character varying", { name: "CustomerUserCode", nullable: true })
  customerUserCode: string | null;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "Email" })
  email: string;

  @Column("character varying", { name: "Password" })
  password: string;

  @Column("character varying", { name: "CurrentOTP", default: () => "0" })
  currentOtp: string;

  @Column("boolean", { name: "IsVerifiedUser", default: () => "false" })
  isVerifiedUser: boolean;

  @Column("boolean", { name: "Active ", default: () => "true" })
  active: boolean;
}
