export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(DayToCheck => DayToCheck.name === day);
  if(!filteredDay){
    return [];
  }
  return filteredDay.appointments.map(appointmentId => state.appointments[appointmentId]) ;
}

export default getAppointmentsForDay;