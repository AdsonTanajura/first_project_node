import Appointment from '../models/Appointments';
import postgresDataSource from '../datebase/data-source';


    export const AppointmentsRepository = postgresDataSource.getRepository(Appointment).extend({
        async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date: date },
        });
        return findAppointment || null;
    }
});

