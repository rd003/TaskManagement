import { createReducer, on } from "@ngrx/store";
import { TaskCategory } from "../../models/task-category.model";
import { CommonFields } from "../util/common-fields";
import * as TaskCategoryActions from "./task-category.actions";
export interface TaskCategoryState extends CommonFields{
    taskCategories: ReadonlyArray<TaskCategory>
}

export const _initialTaskCategoryState:TaskCategoryState={
    taskCategories: [],
    loading: false,
    error:null
}

export const taskCategoriesReducer = createReducer(
    _initialTaskCategoryState,
    on(TaskCategoryActions.loadCategories, state => (
        { ...state, loading: true }
    )),
    on(TaskCategoryActions.loadCategoriesSuccess, (state, {taskCategories}) => (
       {...state,taskCategories,loading:false}
    )),
    on(TaskCategoryActions.loadCategoriesFailure, (state, { error }) => (
        {...state,loading:false,error}
    ))
);