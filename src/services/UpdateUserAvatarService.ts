import postgresDataSource from "../datebase/data-source";
import User from "../models/User";
import UpdateUserAvatarServiceDTO from "../interfaces/UpdateUserAvatarServiceDTO";
import path from 'path';
import uplaodConfig from '../config/uplaod';
import fs from 'fs';
import AppError from "../errors/AppError";

class UpdadeUserAvatarService {
    public async execute({ user_id, avatarFilename }: UpdateUserAvatarServiceDTO): Promise<User> {
        const usersRepository = postgresDataSource.getRepository(User);

        const user = await usersRepository.findOne({ where: { id: user_id } });

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uplaodConfig.directory, user.avatar);

            try {
                await fs.promises.stat(userAvatarFilePath);
                await fs.promises.unlink(userAvatarFilePath);
            } catch (err: any) {
                if (err.code !== 'ENOENT') {
                    throw err;
                }
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdadeUserAvatarService;