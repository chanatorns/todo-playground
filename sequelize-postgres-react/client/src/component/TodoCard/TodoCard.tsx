import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import dataStore from '../../store/dataStore';
import { booleanToStatus, statusToBoolean } from '../../utils/todo';
import { NewStepCard, Wrapper } from './TodoCard.styled';
import SubtaskCard from '../SubTasksCard/SubTasksCard';
import { debounce } from 'lodash';
import Button from '../Button/Button';

interface Props {
  data? : {
    title?: string,
    status?: string,
    id?: string,
    subtasks?: {
      title?: string,
      status?: string,
      id?: string,
    }[]
  }
}

const onTickTodo = (e) => {
  const id = e.target.value;
  const status = booleanToStatus(e.target.checked);
  dataStore.changeTodoStatus(id, status);
}

const createSubtask = (title, todo_id, cb) => {
  dataStore.createSubtask(title, todo_id);
  cb();
}

const deboounceCreateTodos = debounce((title, todo_id, cb) => createSubtask(title, todo_id, cb), 300);

const TodoCard: React.FunctionComponent<Props> = (props) => {
  const [expand, setExpand] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const addStepRef = useRef(null)
  const { title, status, id, subtasks } = props.data;
  let totalCompletedSubtasks = 0;
  subtasks.forEach(s => {
    if (statusToBoolean(s.status)) {
      totalCompletedSubtasks++;
    }
  });
  const totalSubtasks = subtasks.length;

  return <>
    <Wrapper onClick={(e: any) => {
      if (e.target.type !== 'checkbox') {
        setExpand(!expand)
      }
    }}>
      <input type="checkbox"
        value={id} 
        checked={statusToBoolean(status)}
        onChange={onTickTodo}/>
      <div className='content'>
        <div>{title}</div>
        <span>
          {totalSubtasks > 0 && `${totalCompletedSubtasks} of ${totalSubtasks} completed ${expand ? '▲' : '▼'}`}
        </span>
      </div>
    </Wrapper>
    {
      expand && subtasks?.map(subtask=> {
        return <SubtaskCard key={subtask.id} data={{ ...subtask, todo_id: id }}/>
      })
    }
    {
      expand && <NewStepCard>
        <input ref={addStepRef} className="add-step" type="text" placeholder="What are the steps?" 
          onChange={e => {
            setSubtaskTitle(e.target.value);
          }}/>
        <Button disabled={!subtaskTitle} onClick={() => {
          deboounceCreateTodos(subtaskTitle, id, () => {
            setSubtaskTitle('')
            addStepRef.current.value = ''
          });
        }}>New Step</Button>
      </NewStepCard>
    }
  </>
}

export default observer(TodoCard);