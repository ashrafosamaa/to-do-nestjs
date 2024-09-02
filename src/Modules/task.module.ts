import { Module } from "@nestjs/common";
import { models } from "../DB/models-generation";
import { TaskController } from "src/Task/task.controller";
import { TaskService } from "src/Task/task.service";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports : [models] ,
    controllers : [TaskController] ,
    providers : [TaskService, JwtService] 
})

export class TaskModule {}
