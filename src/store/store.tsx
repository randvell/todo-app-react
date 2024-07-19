import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {tasksReducer} from './tasks/tasksSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
