import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ITasks,
  INewTask,
  ITask,
  TaskState,
  generateTaskId,
  TaskId,
} from './tasksAction';

const initialState: ITasks = {
  currentUser: null,
  list: [],
};

const setTasksLogic = (state: ITasks, tasks: ITask[]) => {
  state.list = tasks;
  if (state.currentUser) {
    localStorage.setItem(`tasks_${state.currentUser}`, JSON.stringify(tasks));
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    addTask: (state, action: PayloadAction<INewTask>) => {
      const newTask = {
        ...action.payload,
        state: TaskState.New,
        id: generateTaskId(),
      };
      const newTasks = [...state.list, newTask];
      setTasksLogic(state, newTasks);
    },
    editTask: (state, action: PayloadAction<{id: TaskId, newName: string}>) => {
      const taskId = action.payload.id;
      const newName = action.payload.newName;
      const task = state.list.find((task) => task.id === taskId);
      if (task) {
        task.name = newName;
        setTasksLogic(state, state.list);
      }
    },
    deleteTask: (state, action: PayloadAction<TaskId>) => {
      const taskId = action.payload;
      const newTasks = state.list.filter((task) => task.id !== taskId);
      setTasksLogic(state, newTasks);
    },
    completeTask: (state, action: PayloadAction<TaskId>) => {
      const taskId = action.payload;
      const task = state.list.find((task) => task.id === taskId);
      if (task) {
        task.state = TaskState.Done;
        setTasksLogic(state, state.list);
      }
    },
    setTasks: (state, action: PayloadAction<Array<ITask>>) => {
      setTasksLogic(state, action.payload);
    },
    loadTasks: (state) => {
      const currentUser = state.currentUser;
      if (currentUser) {
        state.currentUser = currentUser;
        const tasks = localStorage.getItem(`tasks_${currentUser}`);
        if (tasks) {
          state.list = JSON.parse(tasks);
        }
      }
    },
  },
});

export const {setCurrentUser, addTask, editTask, deleteTask, completeTask, setTasks, loadTasks} =
  tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
