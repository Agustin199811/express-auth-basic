import { Request, Response } from "express";
import { RolesService } from "../roles/roles.service";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { HttpException } from "../../common/utils/http.exception";
import { RegisterUserDto } from "./dto/auth.register.dto";

const usersService = new UsersService();
const rolesService = new RolesService();
const authService = new AuthService(usersService, rolesService);

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