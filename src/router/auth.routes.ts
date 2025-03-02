import { RequestHandler, Router } from "express";
import { validateDTO } from "../common/middleware/validate-dto.middleware";
import { RegisterUserDto } from "../models/auth/dto/auth.register.dto";
import { register } from "../models/auth/auth.controller";


const authRouter = Router();
authRouter.post("/auth/register", validateDTO(RegisterUserDto) as any,  register as unknown as RequestHandler);

export default authRouter;