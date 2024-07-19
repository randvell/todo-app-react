// import style from './List.module.scss';

import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import Task from './Task';

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.list);

  return (
    <div className="table-wrapper">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Приоритет</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, i) => (
            <Task key={task.id} task={task} num={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
