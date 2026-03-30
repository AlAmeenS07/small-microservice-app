import { User } from "../../domain/entities/user.entity";
import { IPasswordService } from "../../domain/interfaces/Ipassword";
import { IUserRepository } from "../../domain/interfaces/Iuser.repository"
import { USER_ALREADY_EXIST } from "../../utils/constatns";

export class UserRegister{
    constructor(
        private _userRepo : IUserRepository,
        private _passwordHash : IPasswordService
    ){}

    async execute(name : string , email : string , password : string) : Promise<User>{

        const userExist = await this._userRepo.findByEmail(email)

        if(userExist){
            throw new Error(USER_ALREADY_EXIST);
        }

        const hashedPassword = await this._passwordHash.hashPassword(password)

        const user = new User(name, email, hashedPassword);

        return await this._userRepo.create(user);

    }

}