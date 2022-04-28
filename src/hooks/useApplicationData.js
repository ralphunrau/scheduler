import { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  
  //INITIALIZES STATE
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  //FUNCTION THAT SETS A NEW DAY ON CALL
  const setDay = day => setState({ ...state, day });

  //SETS STATE, RETRIEVING THE INFO FROM THE DATABASE
  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  //SETS NEW SPOTS STATE WHEN AN APPOINTMENT IS BOOKED OR CANCELLED
  function updateSpots(state, appointmentId) {

    //RETURNS A SINGLE DAY OBJECT THAT AHS THE CURRENT APPOINTMENT ID
    const currentDay = state.days.find((day) => {
      return day.appointments.includes(appointmentId);
    })

    //RETURNS AN ARRAY OF ALL APPOINTMENTS IN A CURRENT DAY OBJECT THAT ARE NULL
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

  //ADDS A NEW INTERVIEW TO THE DATABASE
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
      });
  };

  //DESTROYS A INTERVIEW IN THE DATABASE
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state,
      appointments
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots(newState, id)
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;