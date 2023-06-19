import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskAttachmentService } from "src/app/services/task-attachment.service";
import { taskAttachmentActions } from "./task-attachment.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class TaskAttachmentEffects{
    loadTasks = createEffect(
        () => {
            return this._actions$.pipe(
                ofType(taskAttachmentActions.loadTaskAttachment),
                switchMap(_ => {
                    return this.attachmentService
                        .getAllAttachment()
                        .pipe(
                            map(taskAttachments => {
                                // console.log({ 'task attachment effect':taskAttachments})
                                return taskAttachmentActions.loadTaskAttachmentSuccess({ taskAttachments });
                            }
                            ),
                            catchError(error => {
                                console.log("error in task attachment effects")
                                return of(taskAttachmentActions.loadTaskAttachmentFailure({ error }));
                            })
                        );
                })
                //switch map ends here
            );
           
           
        }
    );

    addTaskAttachment = createEffect(
        () => {
            return this._actions$
                .pipe(
                    ofType(taskAttachmentActions.addTaskAttachment),
                    switchMap(payload => {
                        return this.attachmentService
                            .uploadFile(payload.taskAttachment)
                            .pipe(
                                map(
                                    taskAttachment => {
                                      return  taskAttachmentActions.addTaskAttachmentSuccess({ taskAttachment })
                                    }
                                ),
                                catchError(
                                    error => (
                                        of(
                                            taskAttachmentActions
                                                .addTaskAttachmentFailure({ error })
                                        )
                                    )
                                )
                            )
                    }
                    )
                );
        }
    );

    deleteTaskAttachment = createEffect(
        () => {
            return this._actions$.pipe(
                ofType(taskAttachmentActions.deleteTaskAttachment),
                switchMap(payload => {
                    return this.attachmentService.deleteAttachment(payload.id)
                        .pipe(
                        map(_ =>
                        {
                            return taskAttachmentActions.deleteTaskAttachmentSuccess({ id: payload.id })
                           }
                        ),
                        catchError(
                            error => {
                                console.log(error)
                                return of(taskAttachmentActions.deleteTaskAttachmentFailure({ error }))
                            }
                        )
                    )
                })
            );
        }
    )

    constructor(private _actions$:Actions,private attachmentService:TaskAttachmentService)
    {
    }
}