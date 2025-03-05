import { PassportStatic } from "passport";
import { UsersService } from "../../users/users.service";
import dotenv from 'dotenv';
import { ExtractJwt, Strategy } from "passport-jwt";

dotenv.config();
const userService = new UsersService();

export function configurePassport(passport: PassportStatic) {
    passport.use(new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET as string
    },
        async (jwtPayload, done) => {
            try {
                const user = await userService.findUserOneByEmail(jwtPayload.email);
                if (user) return done(null, {
                    name: user.name,
                    email: user.email,
                    roles: user.roles.map((role) => role.name)
                });

                return done(null, false);
            } catch (error) {
                return done(error, false);

            }
        }
    ));
}