import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskCategoryLinkState } from "./task-category-link.reducers";

const taskCategoryLinkFeatureState = createFeatureSelector<TaskCategoryLinkState>(
    'taskCategoryLink'
);

const selectShowAddNewTaskCategoryInput = createSelector(
    taskCategoryLinkFeatureState,
    state=>state.showAddNewTaskCategoryInput
)