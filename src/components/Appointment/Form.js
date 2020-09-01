import React, { useState, useReducer } from 'react';
import Button from '../Button/Button';
import InterviewerList from '../InterviewerList/InterviewerList';

const Form = (props) => {
  const [formName, setFormName] = useState(props.name);
  const [formInterviewer, setInterviewer] = useState(null);

  const { name, interviewers, interviewer, onSave, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={formName}
            onChange={e => setFormName(e.target.value)}
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          interviewer={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={onCancel} danger>Cancel</Button>
          <Button onClick={onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
