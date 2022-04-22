
export function getAppointmentsForDay(state, day) {
  const parameterDay = state.days.filter(currentDay => currentDay.name === day);

  if(state.days.length === 0 || parameterDay.length === 0){
    return [];
  }

  const appointmentsFromDays = parameterDay[0].appointments;

  let selectedAppointments = [];
  appointmentsFromDays.forEach(id => {
    selectedAppointments.push(state.appointments[id]);
  });
  return selectedAppointments;
}