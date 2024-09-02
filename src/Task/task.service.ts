import { Injectable, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "src/DB/schemas/task-schema";
import { Model } from "mongoose";


@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel : Model<Task>
    ){}

    async getMyTasks(req: any){
        const tasks = await this.taskModel.find({ assignTo: req.authUser._id })
            .select("title deadLine status")
        if(!tasks.length) throw new ConflictException('No tasks assigned to you found')
        return tasks
    }

    async getTask (req : any) {
        const { taskId } = req.params
        const task = await this.taskModel.findOne({_id: taskId, userId: req.authUser._id})
            .select('title desc deadLine status userId assignTo')
            .populate({ path: 'userId', select: 'name' })
            .populate({ path: 'assignTo', select: 'name' })
        if(!task) throw new ConflictException ('Task not found')
        return task
    }

    async addTask (req : any) {
        const { title, desc, assignTo, deadLine } = req.body
        const newTask = await this.taskModel.create({
            title,
            desc,
            deadLine,
            status: "to-do",
            assignTo,
            userId : req.authUser._id
        })
        return newTask
    }

    async updateTask (req : any) {
        const { title, desc, assignTo, deadLine, status } = req.body
        const { taskId } = req.params
        const updatedTask = await this.taskModel.findById(taskId)
            .select('title desc deadLine status userId assignTo')
            .populate({ path: 'userId', select: 'name' })
            .populate({ path: 'assignTo', select: 'name' })
        if(!updatedTask) throw new ConflictException ('Task not found')
        if(req.authUser._id.toString() != updatedTask.userId._id.toString())
            throw new ConflictException ('You are not authorized to update this task')
        if(title) updatedTask.title = title
        if(desc) updatedTask.desc = desc
        if(assignTo) updatedTask.assignTo = assignTo
        if(deadLine) updatedTask.deadLine = deadLine
        if(status) updatedTask.status = status
        await updatedTask.save()
        return updatedTask
    }

    async deleteTask (req : any) {
        const { taskId } = req.params
        const deletedTask = await this.taskModel.findByIdAndDelete(taskId)
        if(!deletedTask) throw new ConflictException ('Task not found')
        return true
    }
}
