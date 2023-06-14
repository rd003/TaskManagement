import { createReducer, on } from "@ngrx/store";
import { TaskModel } from "src/app/models/task.model";
import { SelectedTaskActions } from './selected-task.actions';

export interface SelectedTaskState{
    selectedTask:TaskModel | null
}

export const _initialSelectedTaskState: SelectedTaskState = {
    selectedTask:null
}
  
  export const selectedTaskReducer = createReducer(
    _initialSelectedTaskState,
      on(SelectedTaskActions.selectTask,
          (state, { task }) => ({ ...state, selectedTask: task })),
      
      on(SelectedTaskActions.removeSelectedTask,
          state => ({ ...state, selectedTask: null }))
  );