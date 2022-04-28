import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

export default function DayListItem(props) {

  //CORRECTS GRAMMAR FOR SPOTS REMAINING
  function formatSpots(spots) {
    if (spots > 1) {
      return `${spots} spots remaining`
    }

    if (spots === 1 ) {
      return '1 spot remaining'
    }
    
    if (spots === 0) {
      return 'no spots remaining'
    }
  };

  //CREATES DIV STYLES DEPENDING ON IF THE DAY IS FULL
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected' : props.selected,
    'day-list__item--full' : props.spots === 0
  });
  
  return (
    <li 
    className={dayClass}
    onClick={() => props.setDay(props.name)}
    data-testid='day'
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};
