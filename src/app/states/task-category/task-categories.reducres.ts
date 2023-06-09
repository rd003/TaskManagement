import { createReducer, on } from "@ngrx/store";
import { TaskCategory } from "../../models/task-category.model";
import { CommonFields } from "../util/common-fields";
import { TaskCategoryActions } from "./task-category.actions";
export interface TaskCategoryState extends CommonFields{
    taskCategories: ReadonlyArray<TaskCategory>,
    selectedTaskCategory:TaskCategory|null,
}

export const _initialTaskCategoryState:TaskCategoryState={
    taskCategories: [],
    selectedTaskCategory:null,
    loading: false,
    error:null
}

export const taskCategoriesReducer = createReducer(
    _initialTaskCategoryState,
    on(TaskCategoryActions.loadCategories, state => (
        { ...state, loading: true }
    )),
    on(TaskCategoryActions.loadCategoriesSuccess, (state, { taskCategories }) => (
        { ...state, taskCategories, loading: false }
    )),
    on(TaskCategoryActions.loadCategoriesFailure, (state, { error }) => (
        { ...state, loading: false, error }
    )),
    on(TaskCategoryActions.selectTaskCategory, (state, { selectedTaskCategory }) => (
        { ...state, selectedTaskCategory }
    )),
    on(TaskCategoryActions.loadDefaultSelectedTaskCategory, (state) => (
        { ...state }
    )),
    on(TaskCategoryActions.loadDefaultSelectedTaskCategorySuccess, (state, { selectedTaskCategory }) => (
        { ...state, selectedTaskCategory }
    )),
    on(TaskCategoryActions.loadDefaultSelectedTaskCategoryFailure, (state, { error }) => (
        { ...state, error }
    )),

    on(TaskCategoryActions.addTaskCategory, (state, { taskCategory }) => {
        return { ...state, loading: true }
    }),
    on(TaskCategoryActions.addTaskCategorySuccess, (state, { taskCategory }) => (
        {
            ...state,
            taskCategories: [...state.taskCategories, taskCategory],
            loading: false
        }
    )),
    on(TaskCategoryActions.addTaskCategoryFailure, (state, { error }) => (
        { ...state, loading: false, error }
    )),
    on(
        TaskCategoryActions.deleteTaskCategory, (state, { id }) => ({ ...state, loading: true })
    ),
    on(TaskCategoryActions.deleteTaskCategorySuccess, (state, { id }) => {
        const newCategories = state.taskCategories.filter(a => a.id !== id);
        return { ...state, loading: false, taskCategories: newCategories };
    }),
    on(
        TaskCategoryActions.deleteTaskCategoryFailure, (state, { error }) => ({ ...state, error, loading: false })
    )
);