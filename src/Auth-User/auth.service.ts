import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../DB/Schemas/user-schema";

import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { SendEmailService } from "../Common/Services/send-email.service";


@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name) private userModel : Model<User>,
        private jwtService : JwtService ,
        private sendEmailService: SendEmailService,
    ) {}

    async signUpService (req : any) {
        const { name, email, password, phone } = req.body
        // email check
        const isEmailExist = await this.userModel.findOne({email})
        if(isEmailExist) throw new BadRequestException("Email Is Already Exist")
        // phone check
        const isPhoneExist = await this.userModel.findOne({phone})
        if(isPhoneExist) throw new BadRequestException("Phone Number Is Already Exist")
        // hash password 
        const hashedPassword = bcrypt.hashSync(password , 10);
        // activation code
        const activateCode = Math.floor(1000 + Math.random() * 9000).toString();
        const accountActivateCode = bcrypt.hashSync(activateCode, 8)
        // send confirmation email
        try{
            await this.sendEmailService.sendEmail(
                email,
                "Verification Code (valid for 10 minutes)",
                `Hi ${name},\nYour verification code is ${activateCode}.
                \nEnter this code to access our [website or app] to activate your [customer portal] account.
                \nWe’re glad you’re here!`,
            )
        }
        catch{
            throw new InternalServerErrorException(`Email not sent, please try again`);
        }
        // create new user
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            accountActivateCode
        })
        if(!user) {
            throw new InternalServerErrorException(`An error occurred while creating user`);
        }
        return true
    }

    async confirmEmail (req : any) {
        const { email, activateCode } = req.body;
        const user = await this.userModel.findOne({email})
        if (!user) {
            throw new ConflictException("User Not Found")
        }
        // verify otp
        const checkCode = bcrypt.compareSync(activateCode , user.accountActivateCode)
        // check if otp is valid
        if(!checkCode){
            throw new BadRequestException("Invalid verification code")
        }
        user.accountActivateCode = "0"
        await user.save()
        // return token
        const userToken = this.jwtService.sign({ id: user._id, name: user.name, email: user.email },
            { secret: "LogIn-Secret", expiresIn: "90d" })
        return userToken
    }

    async LogIn (req : any) {
        const {email , password} = req.body
        // email check
        const user = await this.userModel.findOne({ email })
        if(!user) throw new BadRequestException("Wrong Credentials")
        // check password
        const checkPassword = bcrypt.compareSync(password , user.password)
        if(!checkPassword) throw new BadRequestException("Wrong Password")
        // return token
        const userToken = this.jwtService.sign({ id: user._id, name: user.name, email: user.email },
            { secret: "LogIn-Secret", expiresIn: "90d" })
        return userToken
    }
}
