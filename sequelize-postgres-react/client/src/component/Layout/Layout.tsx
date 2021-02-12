import React, { useEffect, useRef, useState } from 'react';
import { Container } from './Layout.styled';
import { observer } from 'mobx-react-lite';
import Button from '../Button/Button';
import dataStore from '../../store/dataStore';
import debounce from 'lodash/debounce';
import TodoCard from '../TodoCard/TodoCard';
import { toJS } from 'mobx';

const fetchTodos = () => {
  dataStore.fetchTodos();
}

const createTodos = (title, cb) => {
  dataStore.createTodo(title);
  cb();
}

const deboounceCreateTodos = debounce((title, cb) => createTodos(title, cb), 500);

const Layout = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const addTodoRef = useRef(null);
  useEffect(() => {
    fetchTodos()
  }, []);

  return (
    <Container fluid>
      <Container>
        <h1>TODO APP</h1>
        <div style={{ paddingBottom: '2rem' }}>
          <input ref={addTodoRef} className="add-todo" type="text" placeholder="What to do?" 
            onChange={e => {
              setTodoTitle(e.target.value);
            }}/>
          <Button disabled={!todoTitle} onClick={() => deboounceCreateTodos(todoTitle, () => {
            setTodoTitle('')
            addTodoRef.current.value = ''
          })}>
            New List
          </Button>
        </div>
        {
          <div>
            {
              dataStore.todoList?.map(todo => {
                return <TodoCard key={todo.id} data={toJS(todo)}/>
              })
            }
          </div>
        }
      </Container>
    </Container>
  );
}

export default observer(Layout);
