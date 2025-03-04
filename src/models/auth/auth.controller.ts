import { Request, Response } from "express";
import { RolesService } from "../roles/roles.service";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { HttpException } from "../../common/utils/http.exception";
import { RegisterUserDto } from "./dto/auth.register.dto";
import { LoginUserDto } from "./dto/auth.login.dto";
import { AuthRequest } from "./interface/auth.interface";
import { MailService } from "../mail/mail.service";

const usersService = new UsersService();
const rolesService = new RolesService();
const mailService = new MailService();
const authService = new AuthService(usersService, rolesService, mailService);

export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await authService.registerUser(req.body as RegisterUserDto);
        return res.status(201).json(user);
    } catch (err) {
        if (err instanceof HttpException) {
            return res.status(err.status).json({ message: err.message });
        }

        return res.status(500).json({ message: 'Internal problem server' });
    }
}

export const singIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await authService.singIn(req.body as LoginUserDto);
        return res.status(200).json(user);
    } catch (err) {
        if (err instanceof HttpException) {
            return res.status(err.status).json({ message: err.message });
        }

        return res.status(500).json({ message: 'Internal problem server' });
    }
}

export const profile = async (req: AuthRequest, res: Response): Promise<Response> => {
    const { name, email, roles } = req.user;
    return res.json({
        name,
        email,
        roles
    });
} 