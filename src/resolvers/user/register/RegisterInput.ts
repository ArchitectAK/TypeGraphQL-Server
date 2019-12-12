import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {
    @Field()
    @Length(2, 30)
    firstName: string;

    @Field()
    @Length(2, 30)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "email already in use" })
    email: string;

    @Field()
    password: string;
}
