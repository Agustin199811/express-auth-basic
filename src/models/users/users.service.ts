import { In, IsNull, Repository } from "typeorm";
import { User } from "./entity/users.entity";
import { TypeOrmConfig } from "../../common/config/database.config";
import { CreateUserDto } from "./dto/create-users.dto";
import { Role } from "../roles/entity/roles.entity";
import { HttpException } from "../../common/utils/http.exception";

export class UsersService {
    private readonly userRepository: Repository<User>;
    private readonly rolesRepository: Repository<Role>;
    constructor() {
        this.userRepository = TypeOrmConfig.getRepository(User);
        this.rolesRepository = TypeOrmConfig.getRepository(Role);
    }

    public async createUser(createUser: CreateUserDto): Promise<User> {

        let roles: Role[] = [];
        if (createUser.roles && createUser.roles.length > 0 && typeof createUser.roles[0] === 'object') {
            roles = createUser.roles;
        } else if (createUser.roles && createUser.roles.length > 0) {
            roles = await this.rolesRepository.findBy({ name: In(createUser.roles) });
        }

        const users = this.userRepository.create({ ...createUser, roles })
        return await this.userRepository.save(users);
    }

    public async findUserOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }

    public async findAllUser(): Promise<User[]> {
        const user = await this.userRepository.find({
            where: {
                deleteAt: IsNull()
            }
        });
        return user;
    }

    public async update(id: string, updaUserDto: Partial<CreateUserDto>): Promise<User> {
        const { roles, ...updateData } = updaUserDto;

        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException(400, "User not found");
        }
        let updateRoles: Role[] = [];
        if (updaUserDto.roles && updaUserDto.roles.length > 0 && typeof updaUserDto.roles[0] === 'object') {
            updateRoles = updaUserDto.roles;
        } else if (updaUserDto.roles && updaUserDto.roles.length > 0) {
            updateRoles = await this.rolesRepository.findBy({ name: In(updaUserDto.roles) });
        }
        Object.assign(user, updateData);
        return await this.userRepository.save(user);
    }

    public async softDeleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException(400, "User not found");
        }
        user.deleteAt = new Date();
        await this.userRepository.softDelete(user);
    }

}