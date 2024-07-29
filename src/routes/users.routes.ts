import { Router } from 'express';
import CreateUsersService from '../services/CreateUserService';
import ensureAuthetucated from '../middlewares/ensureAuthenticated';

import multer from 'multer';
import uplaodConfig from '../config/uplaod';

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

usersRouter.patch('/avata', ensureAuthetucated, uplaod.single('avatar'), async (request, response) => {
  console.log(request.file);
  return response.json({ ok: true })
} )

export default usersRouter;
