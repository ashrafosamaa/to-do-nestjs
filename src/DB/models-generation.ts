import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "./Schemas/user-schema";
import { Task, taskSchema } from "./schemas/task-schema";


export const models = MongooseModule.forFeature([
    {name : User.name , schema : userSchema},
    {name : Task.name , schema : taskSchema},
])
