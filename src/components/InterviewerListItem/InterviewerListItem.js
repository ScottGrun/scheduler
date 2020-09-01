import React from 'react';
import className from 'classnames';
import './InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const { selected, setInterviewer } = props;
  const { id, name, avatar } = props.value;

  const InterviewListItemStyle = className('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  return (
    <li key={id} onClick={e => setInterviewer(id)} className={InterviewListItemStyle}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
