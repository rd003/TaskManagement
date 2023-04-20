import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskModel } from "src/app/models/task.model";

export const TaskActions = createActionGroup({
    source: 'Tasks',
    events: {
        'Load Tasks': emptyProps(),
        'Load Tasks Success': props<{ tasks: ReadonlyArray<TaskModel> }>(),
        'Load Tasks Failure': props<{ error: HttpErrorResponse }>(),
        'Add Task': props<{ task: TaskModel }>(),
        'Add Task Success': props<{ task: TaskModel }>(),
        'Add Task Failure': props<{ error: HttpErrorResponse }>(),
    }
})