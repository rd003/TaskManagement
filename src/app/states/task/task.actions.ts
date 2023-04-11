import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskModel } from "src/app/models/task.model";

export const TaskActions = createActionGroup({
    source: 'Tasks',
    events: {
        'Load Tasks': props<{taskCategoryId:string}>(),
        'Load Tasks Success': props<{ tasks: ReadonlyArray<TaskModel> }>(),
        'Load Tasks Failure': props<{error:HttpErrorResponse}>()
    }
})