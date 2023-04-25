import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "src/app/services/task.service";
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
                    switchMap(_ => (
                        this._taskService.getTasks().pipe(
                            map(result => {
                                return TaskActions.loadTasksSuccess({
                                    tasks: result.items
                                })
                            }),
                            catchError(error => (
                                of(TaskActions.loadTasksFailure({ error }))
                            ))
                        )
                    ))
                );
        }
    );
    
    addTask = createEffect(() => {
        return this._actions$.pipe(
            ofType(TaskActions.addTask),
            switchMap(({ task }) => (
                this._taskService.addTask(task).pipe(
                    map(task =>
                        TaskActions.addTaskSuccess({ task })
                    ),
                    catchError(error => of(TaskActions.addTaskFailure({ error })))
                )
            ))
        )
    });

    updateTask = createEffect(
        () => {
            return this._actions$.pipe(
                ofType(TaskActions.updateTask),
                switchMap(({ task }) =>
                    this._taskService.updateTask(task).pipe(
                        map(task => TaskActions.updateTaskSuccess({ task })),
                        catchError(error => {
                            return of(TaskActions.updateTaskFailure(error))
                        })
                    )
                )
            )
        }
    );

    constructor(private _actions$:Actions,private _taskService:TaskService) {
        
    }
}