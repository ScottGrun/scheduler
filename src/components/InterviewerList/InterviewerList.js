import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem/InterviewerListItem';
import './InterviewList.scss';

const InterviewList = (props) => {
  const { interviewers, interviewer, onChange } = props;

  const parsedInterviewerItems = interviewers.map((interviewerElem) => (
    <InterviewerListItem
      setInterviewer={onChange}
      selected={interviewer === interviewerElem.id}
      value={interviewerElem}
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
