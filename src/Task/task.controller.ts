import { Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { AuthGuard } from "../Guards/auth.guard";


@Controller("task")
export class TaskController {

    constructor (
        private readonly taskService : TaskService
    ) {}

    @Get('all')
    @UseGuards(AuthGuard)
    async getMyTasks (
        @Req() req : Request,
        @Res() res : Response
    ) {
        const tasks = await this.taskService.getMyTasks(req)
        res.status(200).json({
            message : "Tasks fetched successfully",
            statusCode : 200,
            data : tasks
        })
    }

    @Get('/byId/:taskId')
    @UseGuards(AuthGuard)
    async getTask (
        @Req() req : Request,
        @Res() res : Response
    ) {
        const task = await this.taskService.getTask(req)
        res.status(200).json({
            message : "Task fetched successfully",
            statusCode : 200,
            task
        })
    }

    @Post()
    @UseGuards(AuthGuard)
    async addTask (
        @Req() req : Request,
        @Res() res : Response
    ) {
        await this.taskService.addTask(req)
        res.status(201).json({
            message : "Task created successfully",
            statusCode : 201,
        })
    }

    @Put('/:taskId')
    @UseGuards(AuthGuard)
    async updateTask (
        @Req() req : Request,
        @Res() res : Response
    ) {
        const task = await this.taskService.updateTask(req)
        res.status(200).json({
            message : "Task updated successfully",
            statusCode : 200,
            task
        })
    }

    @Delete('/:taskId')
    @UseGuards(AuthGuard)
    async deleteTask (
        @Req() req : Request,
        @Res() res : Response
    ) {
        await this.taskService.deleteTask(req)
        res.status(200).json({
            message : "Task deleted successfully",
            statusCode : 200
        })
    }
}
