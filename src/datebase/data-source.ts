import { DataSource } from "typeorm";
import {CreateAppointments1705606026051} from "./migrations/1705606026051-CreateAppointments";

const postgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "gostack_postgres",
    migrations: [CreateAppointments1705606026051],
   
})

export default postgresDataSource;
