import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskAttachmentService } from "src/app/services/task-attachment.service";
import { taskAttachmentActions } from "./task-attachment.actions";
import { catchError, map, of, switchMap } from "rxjs";

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
                            map(taskAttachments =>
                            {
                               // console.log({ 'task attachment effect':taskAttachments})
                                return taskAttachmentActions.loadTaskAttachmentSuccess({ taskAttachments });
                            }
                            ),  
                            catchError(error =>
                            {
                                console.log("error in task attachment effects")
                                return of(taskAttachmentActions.loadTaskAttachmentFailure({error}));
                             })
                        );
                })
                //switch map ends here
            );
           
           
        }
    )

    constructor(private _actions$:Actions,private attachmentService:TaskAttachmentService)
    {
    }
}