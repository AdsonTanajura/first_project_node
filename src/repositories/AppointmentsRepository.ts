import Appointment from "../models/Appointments";
import isEqual from "date-fns/isEqual";

interface CreateAppointmentTDO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];
    
    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentInSameDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date)
        );
        return findAppointmentInSameDate || null;
    }
    


    public create({ provider, date }: CreateAppointmentTDO): Appointment {
        const appointment = new Appointment({provider, date});

        this.appointments.push(appointment);
        
        return appointment;
    }
}

export default AppointmentsRepository;