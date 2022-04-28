import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const array1 = props.days.map((day) => {
    return (
      <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.setDay}
      data-testid='day'
      />
    );
  })

  return (
    <ul>
      {array1}
    </ul>
  );
}
