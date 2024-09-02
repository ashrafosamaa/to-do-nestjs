import { Module } from "@nestjs/common";
import { models } from "../DB/models-generation";
import { UserController } from "src/User/user.controller";
import { UserService } from "src/User/user.service";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports : [models] ,
    controllers : [UserController] ,
    providers : [UserService, JwtService] 
})

export class UserModule {}
