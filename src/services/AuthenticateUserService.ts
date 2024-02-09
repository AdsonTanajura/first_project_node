import AuthenticateUserRequestDTO from "../interfaces/AuthenticateUserRequestDTO";
import { sign } from "jsonwebtoken"
import User from "../models/User";
import postgresDataSource from "../datebase/data-source";
import { compare } from "bcryptjs"
import { id } from "date-fns/locale";

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

        const token = sign({}, 'a089b624432f023dc4958ff7d95e0829',{
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token
        };

    }
}

export default AuthenticateUserService;