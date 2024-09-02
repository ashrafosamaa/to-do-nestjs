import { Module } from "@nestjs/common";
import { AuthController } from "../Auth-User/auth.controller";
import { AuthService } from "../Auth-User/auth.service";
import { models } from "../DB/models-generation";
import { JwtService } from "@nestjs/jwt";
import { SendEmailService } from "../Common/Services/send-email.service" ;


@Module({
    imports : [models] ,
    controllers : [AuthController] ,
    providers : [AuthService , JwtService , SendEmailService] 
})

export class AuthModule {}
