import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/Iuser.repository";


export class AllUsers {
    constructor(
        private _userRepo : IUserRepository
    ){}

    async execute() : Promise<User[]> {

        let users =  await this._userRepo.findAll()
        return users
    }
}