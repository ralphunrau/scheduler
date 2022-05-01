import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
import React, { useState } from 'react';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //EMPTIES APPOINTMENT CARD
  const reset = function () {
    setStudent('');
    setInterviewer(null);
  }

  //BRINGS USER BACK TO EMPTY APPOINTMENT CARD
  const cancel = function () {
    reset();
    props.onCancel();
  }

  //PROMTS USER TO HAVE INPU IF NONE
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Interviewer name cannot be blank");
      return;
    }
    
    setError('');
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={student ? student : props.value}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />

        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}