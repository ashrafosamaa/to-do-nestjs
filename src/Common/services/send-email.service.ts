import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';


@Injectable()
export class SendEmailService {

    async sendEmail(
        to: string,
        subject: string,
        message: string,
        attachments?: [],
    ) {
        // configurations
        const transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                // credentials
                user: 'ashrafosama667@gmail.com' ,
                pass: 'nhjlqtkneismrwxk',
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const emailInfo = await transporter.sendMail({
            from: '"no-reply"',
            to: to ? to : '',
            subject: subject ? subject : 'Hello',
            html: message ? message : '',
            attachments,
        })
        if (emailInfo.accepted.length) {
            return true
        }
        return false
    }
}
