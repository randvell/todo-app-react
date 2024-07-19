// import style from './Main.module.scss';

import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

import LoginForm from './LoginForm';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export const Main: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.tasks.currentUser
  );

  return (
    <div className="d-flex align-items-center flex-column">
      <h3>Todo App {currentUser ? `- ${currentUser}` : ''}</h3>
      {!currentUser ? (
        <LoginForm />
      ) : (
        <>
          <TaskForm />
          <TaskList />
        </>
      )}
    </div>
  );
};

export default Main;
