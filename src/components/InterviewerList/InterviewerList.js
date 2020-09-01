import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem/InterviewerListItem';
import './InterviewList.scss';

const InterviewList = (props) => {
  const { interviewers, interviewer, setInterviewer } = props;

  const parsedInterviewerItems = interviewers.map((interviewerElem) => (
    <InterviewerListItem
      setInterviewer={(e) => setInterviewer(interviewer)}
      selected={interviewer === interviewerElem.id}
      interviewer={interviewerElem}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerItems}</ul>
    </section>
  );
};

export default InterviewList;
