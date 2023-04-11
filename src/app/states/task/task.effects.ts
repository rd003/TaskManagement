import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "src/app/services/task.sevice";
import { TaskActions } from "./task.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class TaskEffects{

    loadTasks = createEffect(
        () => {
            return this._actions$
                .pipe(
                    ofType(TaskActions.loadTasks),
                    switchMap(({ taskCategoryId }) => (
                        this._taskService.getTasks(taskCategoryId).pipe(
                            map(result => {
                                return TaskActions.loadTasksSuccess({
                                    tasks: result.items
                                })
                            }),
                            catchError(error => (
                               of(TaskActions.loadTasksFailure({error}) )
                            ))
                        )
                    ))
                );
        }
     )

    constructor(private _actions$:Actions,private _taskService:TaskService) {
        
    }
}