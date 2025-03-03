import { RequestHandler, Router } from "express";
import { validateDTO } from "../common/middleware/validate-dto.middleware";
import { RegisterUserDto } from "../models/auth/dto/auth.register.dto";
import { profile, register, singIn } from "../models/auth/auth.controller";
import { LoginUserDto } from "../models/auth/dto/auth.login.dto";
import { authenticateJWT } from "../models/auth/middleware/auth.middleware";
import { authorizeRoles } from "../models/auth/middleware/roles.middeware";


const authRouter = Router();
authRouter.post("/auth/register", validateDTO(RegisterUserDto) as any, register as unknown as RequestHandler);
authRouter.post("/auth/login", validateDTO(LoginUserDto) as any, singIn as unknown as RequestHandler);
authRouter.get("/auth/profile", authenticateJWT, authorizeRoles('user', 'admin') as any , profile as unknown as RequestHandler);
export default authRouter;