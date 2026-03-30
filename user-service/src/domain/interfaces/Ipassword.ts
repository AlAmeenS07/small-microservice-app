
export interface IPasswordService{
    hashPassword(password : string) : Promise<string>
    comparePassword(password : string , ogPassword : string) : Promise<boolean>
}