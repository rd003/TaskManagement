import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskCategory } from "src/app/models/task-category.model";

export const TaskCategoryActions = createActionGroup({
    'source': 'Task Category',
    'events': {
        'Load Categories': emptyProps(),
        'Load Categories Success': props<{ taskCategories: ReadonlyArray<TaskCategory> }>(),
        'Load Categories Failure': props<{ error: HttpErrorResponse | null }>(),
        'Select Task Category': props<{ selectedTaskCategory: TaskCategory }>(),
        'Load Default Selected Task Category': emptyProps(),
        'Load Default Selected Task Category Success': props<{ selectedTaskCategory: TaskCategory }>(),
        'Load Default Selected Task Category Failure': props<{ error: HttpErrorResponse | null }>(),
        'Add Task Category': props<{ taskCategory: TaskCategory }>(),
        'Add Task Category Success': props<{ taskCategory: TaskCategory }>(),
        'Add Task Category Failure':props<{ error:HttpErrorResponse|null }>(),
        'Delete Task Category': props<{ id: string }>(),
        'Delete Task Category Success': props<{id:string}>(),
        'Delete Task Category Failure': props<{error:HttpErrorResponse}>(),
    }
})