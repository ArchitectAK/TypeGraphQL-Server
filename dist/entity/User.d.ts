import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    name(parent: User): string;
    password: string;
}
