import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import postgresDataSource from './datebase/data-source';
import uplaodConfig from '../src/config/uplaod';
const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(uplaodConfig.directory));
app.use(routes);

postgresDataSource.initialize().then(async () =>{
    console.log('DataBase✅')
    app.listen(3333, () => {
        console.log('Server Started on port 3333!!!');
    });
});