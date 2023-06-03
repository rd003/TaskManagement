import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskAttachmentState } from "./task-attachment.reducers";

export const selectTaskAttachmentState = createFeatureSelector<TaskAttachmentState>('taskAttachments');

export const selectTaskAttachments = createSelector(
    selectTaskAttachmentState,
    (state) => {
        return state.taskAttachments
    }
)

export const selectTaskAttachmentLoading = createSelector(
    selectTaskAttachmentState,
    (state)=>state.loading
)

export const selectTaskAttachmentFailure = createSelector(
    selectTaskAttachmentState,
    (state)=>state.error
)