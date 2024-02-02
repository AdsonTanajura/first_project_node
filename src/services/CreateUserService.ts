import User from "../models/User";
import UserRequestTDO from "../interfaces/UserRequestTDO";
import postgresDataSource from "../datebase/data-source";
import { hash } from "bcryptjs"

class CreateUsersService {
    async execute({ email, name, password }:UserRequestTDO): Promise<User> {
        const userRepository = postgresDataSource.getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: {email: email}
        });

        if (checkUserExists) {
            throw new Error('Email adrress alteady used')
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            email,
            name,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}


export default CreateUsersService;