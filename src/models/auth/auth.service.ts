import { HttpException } from "../../common/utils/http.exception";
import { SendEmailDto } from "../mail/dto/mail.dto";
import { MailService } from "../mail/mail.service";
import { RoleEnum } from "../roles/enum/roles.enum";
import { RolesService } from "../roles/roles.service";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "./dto/auth.login.dto";
import { RegisterUserDto } from "./dto/auth.register.dto";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly rolesService: RolesService,
        private readonly mailService: MailService
    ) { }

    public async registerUser(registerDto: RegisterUserDto) {
        const user = await this.userService.findUserOneByEmail(registerDto.email);
        if (user) {
            throw new HttpException(400, 'User already exist');
        }

        const passwordHash = await bcryptjs.hash(registerDto.password, 10);

        const userRole = await this.rolesService.findRoleOneByName(RoleEnum.USER);
        if (!userRole) {
            throw new HttpException(400, 'Role with name does not exist');
        }

        const newUser = await this.userService.createUser({
            ...registerDto,
            password: passwordHash,
            createAt: new Date(),
            roles: [userRole]
        });

        const mailDto = new SendEmailDto();
        mailDto.to = newUser.email;
        mailDto.name = newUser.name;

        await this.mailService.sendWelcomeEmail(mailDto);

        return newUser;
    }

    public async singIn(loginDto: LoginUserDto) {
        const user = await this.userService.findUserOneByEmail(loginDto.email);
        if (!user) {
            throw new HttpException(401, 'Email is wrong');
        }

        const isValidPassword = await bcryptjs.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new HttpException(401, 'Password is wrong');
        }

        const payload = { name: user.name, email: user.email, roles: user.roles.map((role) => role.name) };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '5m' });
        return {
            email: user.email,
            token,
        }
    }
}