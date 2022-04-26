import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList(props) {

  const interviewerArray = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        setInterviewer={(event) => props.onChange(interviewer.id)}
        selected={props.interviewer === interviewer.id}
        avatar={interviewer.avatar}
      />
    );
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerArray}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;