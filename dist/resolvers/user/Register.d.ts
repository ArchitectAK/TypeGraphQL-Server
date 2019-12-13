import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
export declare class RegisterResolver {
    hello(): Promise<string>;
    register({ email, firstName, lastName, password }: RegisterInput): Promise<User>;
}
