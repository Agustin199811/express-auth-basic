import { HttpException } from "../../common/utils/http.exception";
import { RoleEnum } from "../roles/enum/roles.enum";
import { RolesService } from "../roles/roles.service";
import { UsersService } from "../users/users.service";
import { RegisterUserDto } from "./dto/auth.register.dto";
import bcryptjs from 'bcryptjs';
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly rolesService: RolesService,
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

        return await this.userService.createUser({
            ...registerDto,
            password: passwordHash,
            createAt: new Date(),
            roles: [userRole]
        })
    }
}