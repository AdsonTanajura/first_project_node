import { Router } from 'express';
import CreateUsersService from '../services/CreateUserService';
import ensureAuthetucated from '../middlewares/ensureAuthenticated';

import multer from 'multer';
import uplaodConfig from '../config/uplaod';
import UpdadeUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const uplaod = multer(uplaodConfig);

usersRouter.post('/', async (request, response) => {
   try{
    const { name, email, password } = request.body;

    const createUser =  new CreateUsersService();

    const user = await createUser.execute({
      email, name, password
    });

    user.password = 'privader';
    
    
    response.json(user);


   } catch (err: any) {
    return response.status(400).json({ error: err.message});
   }
});

usersRouter.patch('/avatar', ensureAuthetucated, uplaod.single('avatar'), async (request, response) => {
  console.log(request.file)
    const updadeUserAvatar = new UpdadeUserAvatarService();

    const user = await updadeUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file!.filename,
    })

    const { password, ...userWithoutPassword } = user;

    return response.json(userWithoutPassword)
} )

export default usersRouter;
