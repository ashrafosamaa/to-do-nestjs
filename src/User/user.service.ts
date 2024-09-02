import { BadRequestException, Injectable, InternalServerErrorException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../DB/Schemas/user-schema";
import { Model } from "mongoose";


@Injectable()
export class UserService {

    constructor (
        @InjectModel(User.name) private userModel : Model<User>,
    ) {}

    async getAccount (req : any) {
        // get account of user data
        const user = await this.userModel.findById(req.authUser._id).select('name email phone')
        if(!user) throw new ConflictException ('User not found')
        return user
    }

    async updateUser (req : any) {
        const {name , phone} = req.body
        // find user
        const user = await this.userModel.findById(req.authUser._id).select('name email phone')
        if(!user) throw new ConflictException('User not found')
        // new phone check
        if(phone){
            const isPhoneExist = await this.userModel.findOne({phone, _id: {$ne: req.authUser._id} })
            if(isPhoneExist){
                throw new BadRequestException("Phone number is already exists, Please try another phone number")
            }
            user.phone = phone
        }
        if(name) user.name = name
        await user.save()
        return true
    }

    async deleteUser (req : any) {
        const {_id} = req.authUser
        const deletedUser = await this.userModel.findByIdAndDelete(_id)
        if(!deletedUser) throw new InternalServerErrorException("Delete Fail")
        return true
    }
}
