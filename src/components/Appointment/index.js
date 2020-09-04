import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then((data) => transition(SHOW))
    .catch((err)=> console.log(err))
  }

  function cancel(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };

    props.cancelInterview(props.id, interview).then((data) => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={props.interview.student} onEdit={() => transition(EDIT)} onDelete={()=> transition(CONFIRM)} interviewer={props.interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />
      )}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm message="Confirm Delete" onCancel={() => back()} onConfirm={cancel} />}
      {mode === EDIT &&  <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()} />}
    </article>
  );
};

export default Appointment;
