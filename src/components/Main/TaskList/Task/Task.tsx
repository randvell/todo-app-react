// import style from './Task.module.scss';

import {useDispatch} from 'react-redux';
import {ITask, TaskState} from '../../../../store/tasks/tasksAction';
import {
  completeTask,
  deleteTask,
  editTask,
} from '../../../../store/tasks/tasksSlice';
import {useState} from 'react';

interface Props {
  task: ITask;
  num: number;
}

export const Task = ({task, num}: Props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleComplete = () => {
    dispatch(completeTask(task.id));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editTask({id: task.id, newName: editedName}));
    }

    setIsEditing(!isEditing);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const isDone = task.state === TaskState.Done;

  return (
    <tr
      className={`table-${isDone ? 'success' : 'light'} ${
        isDone ? 'text-decoration-line-through' : ''
      }`}
    >
      <td>{num + 1}</td>
      <td className="task">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            className="form-control"
          />
        ) : (
          task.name
        )}
      </td>{' '}
      <td>{task.importance}</td>
      <td>{!isDone ? 'В процессе' : 'Выполнена'}</td>
      <td>
        <button
          className="btn btn-success  me-3"
          disabled={isDone}
          onClick={handleComplete}
        >
          Завершить
        </button>

        {
          <button
            className={`btn ${
              isEditing ? 'btn-primary' : 'btn-secondary'
            } me-3`}
            onClick={handleEdit}
            disabled={isDone || !editedName.length}
          >
            {isEditing ? 'Сохранить' : 'Изменить'}
          </button>
        }

        <button className="btn btn-danger" onClick={handleDelete}>
          Удалить
        </button>
      </td>
    </tr>
  );
};
