import { Injectable } from "@nestjs/common";
import { customAlphabet } from 'nanoid'


@Injectable()
export class GenerateUniqueString {
    generateOTP = (length : number) => {
        const nanoid = customAlphabet('123456', length || 4)
        return nanoid()
    }
}
