import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { TaskCategory } from "src/app/models/task-category.model";

export const loadCategories = createAction('[Task Category] Load Categories');
export const loadCategoriesSuccess = createAction('[Task Category] Load Categories Success', props<{ taskCategories: ReadonlyArray<TaskCategory> }>());
export const loadCategoriesFailure = createAction('[Task Category] Load Categories Failure', props<{ error: HttpErrorResponse | null }>());

