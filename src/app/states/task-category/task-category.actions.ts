import { HttpErrorResponse } from "@angular/common/http";
import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskCategory } from "src/app/models/task-category.model";

// export const loadCategories = createAction('[Task Category] Load Categories');
// export const loadCategoriesSuccess = createAction('[Task Category] Load Categories Success', props<{ taskCategories: ReadonlyArray<TaskCategory> }>());
// export const loadCategoriesFailure = createAction('[Task Category] Load Categories Failure', props<{ error: HttpErrorResponse | null }>());
// export const selectTaskCategory = createAction('[Task Category] Select Task Category', props<{ selectedTaskCategory: TaskCategory }>());
// export const loadDefaultTaskCategory = createAction('[Task Category] Load Default Task Category', props<{ selectedTaskCategory: TaskCategory }>());

export const TaskCategoryActions = createActionGroup({
    'source': 'Task Category',
    'events': {
        'Load Categories': emptyProps(),
        'Load Categories Success': props<{ taskCategories: ReadonlyArray<TaskCategory> }>(),
        'Load Categories Failure': props<{ error: HttpErrorResponse | null }>(),
        'Select Task Category': props<{ selectedTaskCategory: TaskCategory }>(),
        'Load Default Selected Task Category': emptyProps(),
        'Load Default Selected Task Category Success': props<{ selectedTaskCategory: TaskCategory }>(),
        'Load Default Selected Task Category Failure':props<{ error: HttpErrorResponse | null }>(),
    }
})