import { Router } from "express";
import { parseISO } from "date-fns"
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreatAppointmentServices from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointment = appointmentsRepository.all();

    return response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
   try{
    const { provider, date }  = request.body;

    const parsedDate = parseISO(date)

    const createAppointment = new CreatAppointmentServices(appointmentsRepository);

    const appointment = createAppointment.exec({ date: parsedDate, provider});
    
    return response.json(appointment);

   } catch (err) {
    return response.status(400).json({ error: 'Horario Indiponivel'})
   }
});

export default appointmentsRouter;
