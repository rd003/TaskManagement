import { Inject, Injectable } from '@angular/core';
import * as TaskCategoriesActions from './task-category.actions';
import { TaskCategoryService } from 'src/app/services/task-category.sevice';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TaskCategoriesEffects{
    
    loadTaskCategories = createEffect(() => {
        return this._actions$.pipe(
            ofType(TaskCategoriesActions.loadCategories),
            switchMap(_ => (
                this._taskCategoryService.getTaskCategories().pipe(
                    map(result => 
                        TaskCategoriesActions.loadCategoriesSuccess({ taskCategories: result.items })
                    ),
                    catchError(
                        error=>(of(TaskCategoriesActions.loadCategoriesFailure(error)))
                    )
            )
        ))
        )
    }
    );


    constructor(
        private _taskCategoryService: TaskCategoryService,
        private _actions$: Actions
    )
    {
        
      }

}