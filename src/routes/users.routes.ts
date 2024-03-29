import { Router } from 'express';
import CreateUsersService from '../services/CreateUserService';
const usersRouter = Router();


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

export default usersRouter;
