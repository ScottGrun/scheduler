import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const updateDays = (adding, appointment, appointments) => {
    const currentDay = state.day;
    const currentDayToUpdate = state.days.filter((day) => day.name === currentDay)[0];
    let new_day = {};

    //Checks to see if we the appointment currently exists and if it does
    //it will not incremenet the spots remaining
    if (state.appointments[appointment.id].interview) {
      if (!adding) {
        new_day = {
          ...currentDayToUpdate,
          spots: currentDayToUpdate.spots + 1,
        };
      }
    } else {
      if (adding) {
        new_day = {
          ...currentDayToUpdate,
          spots: currentDayToUpdate.spots - 1,
        };
      }
    }

    let new_days = [...state.days];

    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].id === new_day.id) {
        new_days.splice(i, 1, new_day);
      }
    }

    setState({ ...state, appointments, days: new_days });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((apiRes) => {
      const [days, appointments, interviewers] = apiRes;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return {
    state,
    setDay(day) {
      setState({ ...state, day });
    },
    cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      updateDays(false, appointment, appointments);

      return axios.delete(`/api/appointments/${id}`).then((res) => {
        return true;
      });
    },
    bookInterview(id, interview) {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      updateDays(true, appointment, appointments);

      return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
        return true;
      });

    },
  };
};

export default useApplicationData;
