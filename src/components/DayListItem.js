import React from 'react';
import 'components/DayListItem.scss';
import className from 'classnames';

export default function DayListItem(props) {
  const listItemStyle = className('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots < 1,
  });

  const formatSpots = (spots) => {
    switch (spots) {
      case 0:
        return 'no spots remaining';
      case 1:
        return `${spots} spot remaining`;
      default:
        return `${spots} spots remaining`;
    }
  };

  return (
    <li className={listItemStyle} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h2 className="text--light">{formatSpots(props.spots)}</h2>
    </li>
  );
}
