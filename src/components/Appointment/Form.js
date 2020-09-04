import React, { useState } from 'react';
import Button from '../Button/Button';
import InterviewerList from '../InterviewerList/InterviewerList';

const Form = (props) => {
  const [formName, setFormName] = useState(props.name || '');
  const [formInterviewer, setInterviewer] = useState(props.interviewer || null);

  const { onSave } = props;

  const reset = () => {
    setFormName('');
    setInterviewer(null);
  };

  const onCancel = () => {
    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={formInterviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>
            Cancel
          </Button>
          <Button onClick={() => props.onSave(formName, formInterviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
