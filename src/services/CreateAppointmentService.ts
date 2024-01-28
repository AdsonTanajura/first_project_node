import Appointment from "../models/Appointments";
import { startOfHour } from "date-fns";
import { AppointmentsRepository } from "../repositories/AppointmentsRepository";
import RequestTDO from "../interfaces/RequestTDO";

class CreatAppointmentServices{
    public async exec({ provider_id, date }:RequestTDO): Promise <Appointment> {
        const appointmentsRepository = AppointmentsRepository
        const AppointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(AppointmentDate);
    
        if (findAppointmentInSameDate) {
            throw Error('This Appointment is aready booked')
        }
    
        const appointment = appointmentsRepository.create({
            provider_id, 
            date: AppointmentDate
        });
        await appointmentsRepository.save(appointment)
    
        return appointment;
    }
}

export default CreatAppointmentServices;
