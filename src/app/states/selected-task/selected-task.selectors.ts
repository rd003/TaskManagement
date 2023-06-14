import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SelectedTaskState } from "./selected-task.reducers";
import * as TaskAttachmentSelectors from "../task-attachment/task-attachment.selectors";
import { TaskModel } from "src/app/models/task.model";
import { TaskAttachmentModel } from "src/app/models/task-attachment.model";

export const selectedTaskFeatureState = createFeatureSelector<SelectedTaskState>('selectedTask');

export const selectSelectedTask = createSelector(
    selectedTaskFeatureState,
    // add attachment from attachment state here
    TaskAttachmentSelectors.selectTaskAttachments,
    (selectedTaskState, attachments) => {
        const task: TaskModel | null = selectedTaskState.selectedTask;
        if (task === null)
            return task;
        const existingAttachments = task.taskAttachments!;
        const taskAttachments = attachments.filter(a => a.task_id === task.id);
        const newAttachments: TaskAttachmentModel[] = [...new Set([...existingAttachments, ...taskAttachments])];

        var newTask:TaskModel = { ...task,taskAttachments:newAttachments}; 
        // add those attachments which are not present in task
        return newTask;
    }
);
