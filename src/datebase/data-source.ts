import { DataSource } from 'typeorm';
import {CreateAppointments1705606026051} from './migrations/1705606026051-CreateAppointments';
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
    migrations: [CreateAppointments1705606026051],

   
})

export default postgresDataSource;
