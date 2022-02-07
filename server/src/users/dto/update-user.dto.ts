import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({message: 'Должно быть строкой'})
  readonly full_name: string;
  
  @IsString({message: 'Должно быть строкой'})
  @Length(4,16,{message: 'Не меньше 4 и не больше 16'})
  readonly password: string;

  readonly email: string;

  readonly avatar: string;

}