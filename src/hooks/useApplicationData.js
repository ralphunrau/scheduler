import { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function updateSpots(state, appointmentId) {

    // Returns a single day object that has the current appointment ID
    const currentDay = state.days.find((day) => {
      return day.appointments.includes(appointmentId);
    })

    // Returns an array of all appointments in a current day object that are null
    const nullAppointments = currentDay.appointments.filter((id) => {
      return state.appointments[id].interview === null;
    })

    const numOfSpots = nullAppointments.length;

    const newDay = {...currentDay, spots: numOfSpots};

    const newDays = state.days.map((day) => {
      if (day.name === state.day) {
        return newDay;
      } else {
        return day;
      }
    })

    setState({...state, days: newDays})

    return newDays;

  };

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state,
      appointments
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots(newState, id);
      })
    
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const newState = {
      ...state,
      appointments
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots(newState, id)
      })
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export default useApplicationData;

// const updateSpots = function (state, id) {

//   const currentDay = state.days.find((d) => d.appointments.includes(id));
//   const dayIndex = state.days.findIndex((d) => d.id === currentDay.id)

//   const nullAppointments = currentDay.appointments.filter(id => !state.appointments[id].interview) 
//   const spots = nullAppointments.length 

//   const newDay = { ...currentDay, spots };
//   const newDays = state.days.map((d) => { return d.name === state.day ? newDay : d});

//   setState({ ...state, days: newDays });

//   return newDays;
// };