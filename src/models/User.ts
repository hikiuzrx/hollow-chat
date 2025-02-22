import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/types";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required :true,
        lowercase:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre('save',async function (next){
    const salt1 = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt1)
    next()
})
userSchema.statics.login =async function(identifier:string,password:string){
    const user =await this.findOne({identifier})
    if(!user){
        throw new Error("no user with this identifier is found")
    }else {
        const auth = await bcrypt.compare(password,user.password)
        if(!auth){
            throw new Error("wrong passowrd user unauthorized")
        }
        return user
    }
}
const User = mongoose.model<IUser>('user',userSchema)
export default User 