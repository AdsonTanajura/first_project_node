import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import routes from './routes';
import cors from 'cors';
import postgresDataSource from './datebase/data-source';
import uplaodConfig from '../src/config/uplaod';
import AppError from './errors/AppError';
const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(uplaodConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error ',
    })
})

postgresDataSource.initialize().then(async () =>{
    console.log('DataBase✅')
    app.listen(3333, () => {
        console.log('Server Started on port 3333!!!');
    });
});