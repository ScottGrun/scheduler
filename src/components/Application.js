import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList/DayList';
import Appointment from 'components/Appointment/index';

import 'components/Application.scss';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Fred Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Jeff Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
];

const parsedAppointments = appointments.map((appointmentElem) => (
  <Appointment key={appointmentElem.id} {...appointmentElem} />
));

export default function Application(props) {
  const [currentDay, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8001/api/days')
      .then((apiRes) => setDays(apiRes.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={currentDay} setDay={setDay} />
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
