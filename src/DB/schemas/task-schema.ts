import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class Task {
    @Prop({
        required: true,
        type: String,
    })
    title: string;

    @Prop({
        required: true,
        type: String,
    })
    desc: string;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: 'User',
    })
    userId: Types.ObjectId;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: 'User',
    })
    assignTo: Types.ObjectId;

    @Prop({
        required: true,
        type: Date,
    })
    deadLine: Date;

    @Prop({
        required: true,
        type: String,
        default: "to-do",
        enum: ["to-do", "doing", "done"],
    })
    status: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);
