import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {
   try{
        const { email, password } = request.body;

        console.log(email)
        console.log(password)

        const authenticateUser = new AuthenticateUserService();

       const { user, token } = await authenticateUser.execute({
            email,
            password, 
        });

        user.password = 'privader';

        return response.json({user, token});
   } catch (err: any) {
    return response.status(err.statusCode).json({ error: err.message});
   }
});

export default sessionsRouter;
