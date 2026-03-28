import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/Iuser.repository";
import { UserModel } from "../database/user.model";


export class UserRepository implements IUserRepository{
    async create(user: User): Promise<User> {
        
        const createdUser = await UserModel.create({name : user.name , email : user.email , password : user.password})

        return new User(createdUser.name , createdUser.email , createdUser.password , createdUser._id.toString())
    }

    async findByEmail(email: String): Promise<User | null> {
        
        const user = await UserModel.findOne({email})

        if(!user){
            return null
        }

        return new User(user.name , user.email , user.password , user._id.toString())
    }
}