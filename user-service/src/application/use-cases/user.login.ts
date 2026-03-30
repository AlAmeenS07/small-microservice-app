import { IPasswordService } from "../../domain/interfaces/Ipassword";
import { IUserRepository } from "../../domain/interfaces/Iuser.repository";
import { JwtTokenService } from "../../infrastructure/services/jwt.service";
import { INVALID_CREDENTIALS, USER_NOT_FOUND } from "../../utils/constatns";


export class UserLogin{
    constructor(
        private _userRepo : IUserRepository,
        private _passwordCheck : IPasswordService,
        private _jwtService : JwtTokenService
    ){}

    async execute(email : string , password : string) : Promise<string>{

        const user = await this._userRepo.findByEmail(email)

        if(!user){
            throw new Error(USER_NOT_FOUND);
        }

        let checkUserPassword = await this._passwordCheck.comparePassword(password , user.password)

    
        if(!checkUserPassword){
            throw new Error(INVALID_CREDENTIALS);
        }

        const token = this._jwtService.signToken(user.id as string)

        return token
    }
}