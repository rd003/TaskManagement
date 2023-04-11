import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./task.reducers";

const taskFeatureState = createFeatureSelector<TaskState>('tasksState');

const tasks = createSelector(
    taskFeatureState,
    (state)=>state.tasks
)

const loading = createSelector(
    taskFeatureState,
    (state)=>state.loading
)

const error = createSelector(
    taskFeatureState,
    (state)=>state.error
)