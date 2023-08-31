import AppointmentsRepository from "../repositories/AppointmentsRepository";
import Appointment from "../models/Appointments";
import { startOfHour } from "date-fns";

interface RequestTDO {
    provider: string;
    date: Date;
}

class CreatAppointmentServices{
    private appointmentsRepository: AppointmentsRepository;
    
    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    
    public exec({ provider, date }:RequestTDO): Appointment {
        const AppointmentDate = startOfHour(date)

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(AppointmentDate);
    
        if (findAppointmentInSameDate) {
            throw Error('Horario Indisponivel')
        }
    
        const appointment = this.appointmentsRepository.create({
            provider, 
            date: AppointmentDate
        });
    
        return appointment;
    }
}

export default CreatAppointmentServices;
