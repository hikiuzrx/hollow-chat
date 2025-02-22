import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "../types/types";
import z from "zod"
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required :true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:false,
        default :""
    }
})
userSchema.pre('save',async function (next){
    const salt1 = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt1)
    next()
})
userSchema.statics.login =async function(identifier:string,password:string){
    const result  = z.string().email().safeParse(identifier)
    let user
    if(!result.success){
         user = await this.findOne({username:identifier})
        if(!user){
            throw new NotFoundException("no user with this identifier is found","User")
        }
    }else{
         user =await this.findOne({ email :identifier})
        if(!user){
            throw new NotFoundException("no user with this identifier is found","User")
        }
    }
        const auth = await bcrypt.compare(password,user.password)
        if(!auth){
            throw new UnauthorizedException("wrong passowrd user unauthorized","User")
        }
        return user
    
}
const User = mongoose.model<IUser , IUserModel>('user',userSchema)
export default User 