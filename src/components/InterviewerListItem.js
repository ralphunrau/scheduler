import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

function InterviewerListItem(props) {

  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected' : props.selected
  });

  //DISPLAYS NAME IF SELECTED CLASS EXISTS
  function displayInterviewerName(props) {
    if (props.selected) {
      return <>{props.name}</>
    } else {
      return <></>
    }
  };

  return (
    <li onClick={props.setInterviewer} key={props.key} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {displayInterviewerName(props)}
    </li>
  );
};

export default InterviewerListItem;