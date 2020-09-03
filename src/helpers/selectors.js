export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find((DayToCheck) => DayToCheck.name === day);
  if (!filteredDay) {
    return [];
  }
  return filteredDay.appointments.map((appointmentId) => state.appointments[appointmentId]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  let interviewWithInterviewer = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
  return interviewWithInterviewer;
}

export default { getAppointmentsForDay, getInterview };
