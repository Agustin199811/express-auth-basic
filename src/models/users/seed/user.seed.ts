import { Repository } from "typeorm";
import { User } from "../entity/users.entity";
import { Role } from "../../roles/entity/roles.entity";
import { TypeOrmConfig } from "../../../common/config/database.config";
import { RoleEnum } from "../../roles/enum/roles.enum";
import bcryptjs from 'bcryptjs';

export class UserSeeder {
    private readonly userRepository: Repository<User>;
    private readonly roleRepository: Repository<Role>;
    constructor() {
        this.userRepository = TypeOrmConfig.getRepository(User);
        this.roleRepository = TypeOrmConfig.getRepository(Role);
    }

    public async seed(): Promise<void> {
        const userRole = await this.roleRepository.findOneBy({ name: RoleEnum.ADMIN });
        if (!userRole) {
            console.log(`Role with name ${userRole} does not exists`);
            return;
        }
        const users = [
            { name: "Admin", email: "admin@admin.com", password: "Admin123" },
            { name: "Admin1", email: "admin1@admin.com", password: "Admin123" },
            { name: "Admin2", email: "admin2@admin.com", password: "Admin123" }
        ];

        for (const user of users) {
            const userExists = await this.userRepository.findOneBy({ email: user.email });
            if (userExists) {
                console.log('User already exists');
                continue;
            }

            const passwordHash = await bcryptjs.hash(user.password, 10);
            const newUser = this.userRepository.create({
                ...user,
                password: passwordHash,
                roles: [userRole]
            });

            await this.userRepository.save(newUser);
            console.log(`User ${user.email} created successfull`)
        }
    }

}