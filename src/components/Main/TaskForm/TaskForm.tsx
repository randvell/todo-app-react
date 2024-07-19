import {useState} from 'react';
import {TaskImportance} from '../../../store/tasks/tasksAction';
import {useDispatch} from 'react-redux';
import {addTask} from '../../../store/tasks/tasksSlice';

export const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [taskImportance, setTaskImportance] = useState<TaskImportance>(
    TaskImportance.Normal
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
    setSubmitDisabled(!e.currentTarget.value.length);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (taskName.trim()) {
      dispatch(addTask({name: taskName, importance: taskImportance}));
      handleReset();
    }
  };

  const handleReset = () => {
    setTaskName('');
    setTaskImportance(TaskImportance.Normal);
    setSubmitDisabled(true);
  };

  const handleImportanceChange = () => {
    setTaskImportance((prevImportance) => {
      switch (prevImportance) {
        case TaskImportance.Low:
          return TaskImportance.Normal;
        case TaskImportance.Normal:
          return TaskImportance.High;
        case TaskImportance.High:
          return TaskImportance.Low;
        default:
          return TaskImportance.Normal;
      }
    });
  };

  const getButtonClass = () => {
    switch (taskImportance) {
      case TaskImportance.Low:
        return 'btn btn-success';
      case TaskImportance.Normal:
        return 'btn btn-warning';
      case TaskImportance.High:
        return 'btn btn-danger';
      default:
        return 'btn btn-secondary';
    }
  };

  return (
    <form className="d-flex align-items-center mb-3">
      <button
        type="button"
        className={`me-3 ${getButtonClass()}`}
        onClick={handleImportanceChange}
      >
        {taskImportance.charAt(0).toUpperCase() + taskImportance.slice(1)}
      </button>

      <label className="form-group me-3 mb-0">
        <input
          type="text"
          className="form-control"
          placeholder="ввести задачу"
          onChange={handleChange}
          value={taskName}
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary me-3"
        onClick={handleSubmit}
        disabled={submitDisabled}
      >
        Сохранить
      </button>

      <button
        type="reset"
        className="btn btn-warning"
        onClick={handleReset}
        disabled={submitDisabled}
      >
        Очистить
      </button>
    </form>
  );
};
