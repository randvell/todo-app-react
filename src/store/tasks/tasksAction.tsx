export enum TaskImportance {
  Low = 'low',
  Normal = 'normal',
  High = 'high',
}

export enum TaskState {
  New = 'new',
  Done = 'done',
}

export interface INewTask {
  name: string;
  importance: TaskImportance;
}

export interface ITask extends INewTask {
  id: TaskId;
  state: TaskState;
}

export interface ITasks {
  currentUser: null | string;
  list: Array<ITask>;
}

export type TaskId = string;

export const generateTaskId = (): TaskId => {
  return Math.random().toString(16).substring(2, 10);
};
