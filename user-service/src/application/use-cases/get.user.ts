import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/Iuser.repository";


export class GetUserById{
    constructor(
        private _userRepo : IUserRepository
    ){}

    async execute(id : string) : Promise<User | null>{

        const user = this._userRepo.findById(id)

        if(!user) return null

        return user
    }
}