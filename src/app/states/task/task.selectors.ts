import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./task.reducers";

export const taskFeatureState = createFeatureSelector<TaskState>('tasksState');

export const tasks = createSelector(
    taskFeatureState,
    (state)=>state.tasks
)

export const loading = createSelector(
    taskFeatureState,
    (state)=>state.loading
)

export const error = createSelector(
    taskFeatureState,
    (state)=>state.error
)

// export const selectTaskCategoryCounts = createSelector(
//     taskFeatureState,
//     (taskState) => taskState.tasks.length
// )
 

