import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

import DayList from 'components/DayList/DayList';
import Appointment from 'components/Appointment/index';

import 'components/Application.scss';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { ...appointment })
      .then((res) => {
        setState({ ...state, appointments });
      });
  }

  // const interview = getInterview(state, appointment.interview);

  const parsedAppointments = getAppointmentsForDay(state, state.day).map((appointmentElem) => (
    <Appointment
      key={appointmentElem.id}
      {...appointmentElem}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
    />
  ));

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <>
          {parsedAppointments}
          <Appointment key="last" time="5pm" />
        </>
      </section>
    </main>
  );
}
