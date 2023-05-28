import { TaskAttachmentModel } from "src/app/models/task-attachment.model";
import { CommonFields } from "../util/common-fields";
import { createReducer, on } from "@ngrx/store";
import { taskAttachmentActions } from "./task-attachment.actions";

export interface TaskAttachmentState extends CommonFields{
    task_attachments: ReadonlyArray<TaskAttachmentModel>
}

const _initialState: TaskAttachmentState = {
    task_attachments: [],
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
    )
    
        
)