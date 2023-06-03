import { TaskAttachmentModel } from "src/app/models/task-attachment.model";
import { CommonFields } from "../util/common-fields";
import { createReducer, on } from "@ngrx/store";
import { taskAttachmentActions } from "./task-attachment.actions";

export interface TaskAttachmentState extends CommonFields{
    taskAttachments: ReadonlyArray<TaskAttachmentModel>
}

const _initialState: TaskAttachmentState = {
    taskAttachments: [],
    loading:false,
    error:null,
}
export const TaskAttachmentReducer = createReducer(
        _initialState,
        on(
            taskAttachmentActions.loadTaskAttachment,(state)=> ({...state,loading:true})
    ),
        on(
            taskAttachmentActions.loadTaskAttachmentSuccess, (state, { taskAttachments }) => ({...state,loading:false,taskAttachments})     
    ),
    on(
        taskAttachmentActions.addTaskAttachmentFailure, (state, { error }) => ({
            ...state,loading:false,error
        })
    ),
    on(
        taskAttachmentActions.addTaskAttachment,
        (state) => {
            return {
                ...state,
                loading: true
            }
        }
    ),
    on(
        taskAttachmentActions.addTaskAttachmentSuccess,
        (state, {taskAttachment }) => {
            const newState = {
                ...state,
                loading: false,
                taskAttachments: [...state.taskAttachments, taskAttachment]
            };
            return newState;
        }
    ),
    on(
        taskAttachmentActions.addTaskAttachmentFailure,
        (state, { error }) =>
        ({
            ...state,
            loading: false,
            error
        })
    )
    
        
)