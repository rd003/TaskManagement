import { createReducer, on } from "@ngrx/store";
import { CommonFields } from "../util/common-fields";
import { TaskModel } from "src/app/models/task.model";
import { TaskActions } from "./task.actions";
export interface TaskState extends CommonFields {
    tasks:ReadonlyArray<TaskModel>
}

export const _initialTaskState:TaskState = {
    tasks: [],
    loading: false,
    error: null
}
export const taskReducer = createReducer(
    _initialTaskState,
    on(
        TaskActions.loadTasks,(state)=>({...state,loading:true})
    ),

    on(
        TaskActions.loadTasksSuccess, (state, { tasks }) => ({
            ...state,tasks,loading:false
        })
    ),
    on(
        TaskActions.loadTasksFailure, (state, { error }) => ({
           ...state,loading:false,error
       })   
    ),
    on(
        TaskActions.addTask, (state, { task }) => (
            {...state,loading:true}
        )
    ),
    on(
        TaskActions.addTaskSuccess, (state, { task }) => (
             { ...state,tasks:[...state.tasks,task] , loading: false }
        )
    ),
    on(
        TaskActions.addTaskFailure, (state, { error }) => (
            {...state,error,loading:false}
        )
    )
 
);