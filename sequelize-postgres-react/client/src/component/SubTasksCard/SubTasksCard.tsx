import { observer } from 'mobx-react-lite';
import React from 'react';
import dataStore from '../../store/dataStore';
import { booleanToStatus, statusToBoolean } from '../../utils/todo';
import { Wrapper } from './SubTasksCard.styled';

interface Props {
  data? : {
    title?: string,
    status?: string,
    id?: string,
    todo_id?: string
  }
}

const onTickTodo = (e, todo_id) => {
  const id = e.target.value;
  const status = booleanToStatus(e.target.checked);
  dataStore.changeSubtaskStatus(id, status, todo_id);
}

const SubTasksCard: React.FunctionComponent<Props> = (props) => {
  const { title, status, id, todo_id } = props.data;

  return <Wrapper>
    <input type="checkbox"
      value={id} 
      checked={statusToBoolean(status)}
      onChange={e => onTickTodo(e, todo_id)}/>
    <div>{title}</div>
  </Wrapper>
}

export default observer(SubTasksCard);