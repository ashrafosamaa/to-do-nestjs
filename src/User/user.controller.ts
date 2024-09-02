import { Controller, Delete, Get, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthGuard } from "../Guards/auth.guard";


@Controller("user")
export class UserController {

    constructor (
        private readonly userService : UserService
    ) {}

    @Get('account')
    @UseGuards(AuthGuard)
    async getAccount (
        @Req() req : Request,
        @Res() res : Response
    ) {
        const user = await this.userService.getAccount(req)
        res.status(200).json({
            message: "Account data fetched successfully",
            statusCode: 200,
            data: user
        })
    }

    @Put("updateUser")
    @UseGuards(AuthGuard)
    async updateUser (
        @Req() req : Request,
        @Res() res : Response
    ) {
        // get response
        await this.userService.updateUser(req)
        // send response
        res.status(200).json({
            message: "User data updated successfully",
            statusCode: 200
        })
    }

    @Delete("deleteUser")
    @UseGuards(AuthGuard)
    async deleteUser (
        @Req() req : Request,
        @Res() res : Response
    ) {
        // get response
        await this.userService.deleteUser(req)
        // send response
        res.status(200).json({
            message : "User account deleted successfully",
            statusCode : 200
        })
    }
}
