import './styles.scss';
import React from 'react'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //SAVES THE INTERVIEW TO THE DATABASE
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      })
  }

  //REMOVES AN INTERVIEW FROM THE DATABASE
  function remove() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
      {mode === CREATE && <Form name={props.name} value={props.value} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING}/>}
      {mode === CONFIRM && <Confirm onConfirm={remove} onCancel={back} message={'Are you sure you would like to delete?'}/>}
      {mode === EDIT && <Form name={props.name} interviewer={props.interview.interviewer.id} value={props.interview.student} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === ERROR_SAVE && <Error onClose={back} message={'Could not save appointment.'}/>}
      {mode === ERROR_DELETE && <Error onClose={back} message={'Could not delete appointment.'}/>}
    </article>
  );
}