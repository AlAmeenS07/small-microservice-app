import axios from "axios";


export class UserDataService{
    
    async getUserById(userId : string) : Promise<{ name : string , email : string} | null>{

        let user = await axios.get(`http://user-service:5001/api/v1/user/${userId}`)

        user = user.data

        if(!user) return null

        return { name : user.data.name , email : user.data.email }
    }
}