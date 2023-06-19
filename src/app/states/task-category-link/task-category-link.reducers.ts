import { createReducer, on } from "@ngrx/store";
import { TaskCategoryLinkActions } from "./task-category-link.action";
export interface TaskCategoryLinkState{
    showAddNewTaskCategoryInput:boolean
}

export const initialTaskCategoryLinkState: TaskCategoryLinkState = {
    showAddNewTaskCategoryInput: false
};

export const taskCategoryLinkReducer = createReducer(
    initialTaskCategoryLinkState,
    on(TaskCategoryLinkActions.toggleAddNewTaskCategoryInput,
        state => ({ ...state, showAddNewTaskCategoryInput:!state.showAddNewTaskCategoryInput}))
)