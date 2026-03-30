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

    async findAll(): Promise<User[]> {

        let users = await UserModel.find()
        users.map(u => {
            return new User(u.name , u.email , u.password , u._id.toString())
        })
        return users
    }

    async findById(id : string): Promise<User | null> {
        
        let user = await UserModel.findById(id)

        if(!user){
            return null
        }

        return new User(user.name , user.email , user.password , user._id.toString())
    }
}