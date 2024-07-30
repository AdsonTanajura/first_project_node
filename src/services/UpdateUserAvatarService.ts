import postgresDataSource from "../datebase/data-source";
import User from "../models/User";
import UpdateUserAvatarServiceDTO from "../interfaces/UpdateUserAvatarServiceDTO";
import path from 'path';
import uplaodConfig from '../config/uplaod';
import fs from 'fs';


class UpdadeUserAvatarService {
    public async execute({ user_id, avatarFilename }: UpdateUserAvatarServiceDTO): Promise<User> {
        const usersRepository =  postgresDataSource.getRepository(User);


        const user = await usersRepository.findOne({ 
            where: { id: user_id } 
        });

        if (!user) {
            throw new Error('Only authenticated users can change avatar.')   
        }

        if (user.avatar) {

            const userAvatarFilePath = path.join(uplaodConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;

        await usersRepository.save(user)

        return user;
    }

}

export default UpdadeUserAvatarService;