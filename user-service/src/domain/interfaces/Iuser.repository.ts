import { promises } from "node:dns";
import { User } from "../entities/user.entity";


export interface IUserRepository{
    create(user : User) : Promise<User>
    findByEmail(email : String) : Promise<User | null>
    findAll() : Promise<User[]>
    findById(id : string) : Promise<User | null>
}