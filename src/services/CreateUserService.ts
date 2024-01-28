import User from "../models/User";
import UserRequestTDO from "../interfaces/UserRequestTDO";
import postgresDataSource from "../datebase/data-source";

class CreateUsersService {
    async execute({ email, name, password }:UserRequestTDO): Promise<User> {
        const userRepository = postgresDataSource.getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: {email: email}
        });

        if (checkUserExists) {
            throw new Error('Email adrress alteady used')
        }

        const user = userRepository.create({
            email,
            name,
            password
        });

        await userRepository.save(user);

        return user;
    }
}


export default CreateUsersService;