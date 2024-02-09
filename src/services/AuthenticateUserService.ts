import AuthenticateUserRequestDTO from "../interfaces/AuthenticateUserRequestDTO";
import { sign } from "jsonwebtoken"
import autheConfig from "../config/authe";
import User from "../models/User";
import postgresDataSource from "../datebase/data-source";
import { compare } from "bcryptjs"


class AuthenticateUserService {
    public async execute({ email, password }: AuthenticateUserRequestDTO): Promise<{ user:User, token:string }> {
        const userRepository = postgresDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: {email} });

        if(!user){
            throw new Error('Incorrect email/password combination')
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('Incorrect email/password combination')
        }

        const { expiresIn, secret } = autheConfig.jwt;

        const token = sign({}, secret,{
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token
        };

    }
}

export default AuthenticateUserService;