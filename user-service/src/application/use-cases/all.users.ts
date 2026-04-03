import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/Iuser.repository";


export interface IAllUsers{
    execute() : Promise<User[]>
}

export class AllUsers implements IAllUsers{
    constructor(
        private _userRepo : IUserRepository
    ){}

    async execute() : Promise<User[]> {

        let users =  await this._userRepo.findAll()
        return users
    }
}