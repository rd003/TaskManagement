import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SelectedTaskState } from "./selected-task.reducers";

export const selectedTaskFeatureState = createFeatureSelector<SelectedTaskState>('selectedTask');

export const selectSelectedTask = createSelector(
    selectedTaskFeatureState,
    // add attachment from attachment state here
    state=>state.selectedTask
)

