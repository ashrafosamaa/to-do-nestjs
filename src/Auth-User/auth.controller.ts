import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";


@Controller("auth") 
export class AuthController {
    constructor (
        private readonly authService : AuthService
    ) {}
    @Post("signup") 
    async signUpController (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response 
        await this.authService.signUpService(req);
        // response 
        res.status(201).json({
            messsage : "User created successfully, Please check your email to verify your account",
            statusCode: 201
        })
    }

    @Post("verify-email") 
    async verifyEmail (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response 
        const token = await this.authService.confirmEmail(req);
        // response 
        res.status(200).json({
            messsage : "Email verified successfully",
            statusCode: 200,
            data: token
        })
    }

    @Post("logIn")
    async logIn (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response 
        const token = await this.authService.LogIn(req);
        // response 
        res.status(200).json({
            messsage : "LogIn successfully",
            statusCode: 200,
            data: token
        })
    }
}
