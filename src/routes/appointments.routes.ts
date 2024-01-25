import { Router } from 'express';
import { parseISO } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import CreatAppointmentServices from '../services/CreateAppointmentService';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = AppointmentsRepository

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
   try{
    const { provider, date }  = request.body;

    const parsedDate = parseISO(date)

    const createAppointment = new CreatAppointmentServices();

    const appointment = await createAppointment.exec({ date: parsedDate, provider});
    
    return response.json(appointment);

   } catch (err: any) {
    return response.status(400).json({ error: err.message})
   }
});

export default appointmentsRouter;
