import { DataSource } from 'typeorm';
import {Migrations} from './migrations/allMigrations';
import Appointment from '../models/Appointments';

const postgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    uuidExtension:"uuid-ossp",
    username: "postgres",
    password: "docker",
    database: "gostack_postgres",
    entities: [Appointment],
    migrations: Migrations,

   
})

export default postgresDataSource;
