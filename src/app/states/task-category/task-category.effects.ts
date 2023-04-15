import {Injectable } from '@angular/core';
import { TaskCategoryActions } from './task-category.actions';
import { TaskCategoryService } from 'src/app/services/task-category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TaskCategoriesEffects{
    
    loadTaskCategories = createEffect(() => {
        return this._actions$.pipe(
            ofType(TaskCategoryActions.loadCategories),
            switchMap(_ => (
                this._taskCategoryService.getTaskCategories().pipe(
                    map(result => 
                        TaskCategoryActions.loadCategoriesSuccess({ taskCategories: result.items })
                    ),
                    catchError(
                        error=>(of(TaskCategoryActions.loadCategoriesFailure(error)))
                    )
            )
        ))
        )
    }
    );

    loadDefaultSelectedTaskCategory = createEffect(()=>{
        return this._actions$.pipe(
            ofType(TaskCategoryActions.loadDefaultSelectedTaskCategory),
            switchMap(
                _ => (this._taskCategoryService.getDefaultCategory().pipe(
                    map(selectedTaskCategory => (
                       TaskCategoryActions.loadDefaultSelectedTaskCategorySuccess({selectedTaskCategory})
                    )),
                    catchError(error => of(
                        TaskCategoryActions.loadDefaultSelectedTaskCategoryFailure({error})
                    ))
                )
                )
            )
        );
    });

    addTaskCategory = createEffect(() => {
        return this._actions$.pipe(
            ofType(TaskCategoryActions.addTaskCategory),
            switchMap(({ taskCategory }) => (
                this._taskCategoryService.addTaskCategory(taskCategory)
                    .pipe(
                         map(taskCategory => TaskCategoryActions.addTaskCategorySuccess({ taskCategory })
                        ),
                        catchError(
                            error => of(TaskCategoryActions.addTaskCategoryFailure({ error }))
                        )
                    )
            ))
        );
    });
   
    constructor(
        private _taskCategoryService: TaskCategoryService,
        private _actions$: Actions
    )
      {
        
      }

}
