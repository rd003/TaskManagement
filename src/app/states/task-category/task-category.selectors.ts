import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskCategoryState } from "./task-categories.reducres";

export const selectTaskCategoryState = createFeatureSelector<TaskCategoryState>('taskCategories');

export const selectTaskCategories = createSelector(
    selectTaskCategoryState,
    (state) => {
        return state.taskCategories;
    }
)

export const selectTaskCategoriesLoading = createSelector(
    selectTaskCategoryState,
    state=>state.loading
)

export const selectTaskCategoriesError = createSelector(
    selectTaskCategoryState,
    state=>state.error
)