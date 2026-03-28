import { IBcryptPassword } from "../../domain/interfaces/Ipassword";
import bcrypt from "bcryptjs"

export class BcryptPasswordService implements IBcryptPassword{
    async hashPassword(password: string): Promise<string> {
        let hashPassword = await bcrypt.hash(password , 10)
        return hashPassword
    }

    async comparePassword(password: string , ogPassword : string): Promise<boolean> {
        return await bcrypt.compare(password , ogPassword)
    }
}