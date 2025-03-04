import { Subject } from "typeorm/persistence/Subject";
import { SendEmailDto } from "./dto/mail.dto";
import transporter from "../../common/config/mail.config";
import { HttpException } from "../../common/utils/http.exception";

export class MailService {

    public async sendWelcomeEmail(emailData: SendEmailDto) {
        const { to, name } = emailData;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Welcome to application',
            html: `<p> Hello ${name}</p> <p>Welcome to my application</p>`

        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            throw new HttpException(400, 'Problem to send email');
        }
    }
}