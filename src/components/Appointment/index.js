import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
const DELETEING = 'DELETEING';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    
    if(!interview.interviewer){
      return
    } else {
      transition(SAVING, true);
      props
        .bookInterview(props.id, interview)
        .then((data) => transition(SHOW))
        .catch((err) => transition(ERROR_SAVE, true));
    }


  }

  function cancel(name, interviewer) {
    transition(DELETEING, true);
    const interview = {
      student: name,
      interviewer,
    };

    props
      .cancelInterview(props.id, interview)
      .then((data) => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm message="Confirm Delete" onCancel={() => back()} onConfirm={cancel} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && <Error onClose={() => back()} message="There was a error saving." />}
      {mode === ERROR_DELETE && (
        <Error onClose={() => back()} message="There was a error deleteing." />
      )}
      {mode === DELETEING && <Status message="Deleteing" />}
    </article>
  );
};

export default Appointment;
