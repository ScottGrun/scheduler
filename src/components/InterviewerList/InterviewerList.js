import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem/InterviewerListItem';
import './InterviewList.scss';

const InterviewList = (props) => {
  const { interviewers, interviewer, onChange } = props;

  const parsedInterviewerItems = interviewers.map((interviewerElem) => (
    <InterviewerListItem
      key={interviewerElem.id}
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

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

//Prop type validation

export default InterviewList;
