import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from "class-validator";

export class DefaultProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  shortDesc: string;

  @ApiProperty()
  @IsNotEmpty()
  longDesc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  discountPrice: string;

  @ApiProperty({
    description: "Size value, must be 1, 2, or 3",
    enum: [1, 2, 3], // This adds documentation for Swagger
    example: 1, // Example value for Swagger
  })
  @IsNotEmpty()
  @IsIn([1, 2, 3], {
    message: "Size must be one of the following values: 1, 2, or 3",
  })
  size: number; // Use `number` if the size is numeric

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  categoryId: string;
}
