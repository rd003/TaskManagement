import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskAttachmentCreateModel, TaskAttachmentModel } from "src/app/models/task-attachment.model";

export const taskAttachmentActions = createActionGroup({
    source: 'Tasks',
    events: {
        'Load Task Attachment': emptyProps(),
        'Load Task Attachment Success': props<{ taskAttachments: ReadonlyArray<TaskAttachmentModel> }>(),
        'Load Task Attachment Failure': props<{ error: HttpErrorResponse }>(),
        'Add Task Attachment': props<{ taskAttachment: TaskAttachmentCreateModel }>(),
        'Add Task Attachment Success': props<{ taskAttachment: TaskAttachmentModel }>(),
        'Add Task Attachment Failure': props<{ error: HttpErrorResponse }>(),
        'Delete Task Attachment': props<{ task_id: number }>(),
        'Delete Task Attachment Success': props<{ task_id: number }>(),
        'Delete Task Attachment Failure': props<{error:HttpErrorResponse}>()
    }
})