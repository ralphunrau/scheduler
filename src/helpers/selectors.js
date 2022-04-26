
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

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewObject = {
    'student': interview.student,
    'interviewer': {
      'id': interviewerId,
      'name': state.interviewers[interviewerId].name,
      'avatar': state.interviewers[interviewerId].avatar
    }
  }
  return interviewObject;
}

export function getInterviewersForDay(state, name) {
  
  const filteredDays = state.days.filter(day => day.name === name);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  const interviewersFromDays = filteredDays[0].interviewers;

  let filteredInterviewers = [];

  for (let interviewer of interviewersFromDays) {
    if (state.interviewers[interviewer]) {
      filteredInterviewers.push(state.interviewers[interviewer]);
    }
  }
  return filteredInterviewers;
}
