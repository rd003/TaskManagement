import {Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { catchError, delay, EMPTY, Observable, of, tap } from "rxjs";
import { TaskListModel, TaskModel } from "../models/task.model";

@Injectable({ providedIn:'root'})
export class TaskService{
    private baseUrl = `${environment.baseUrl}/task/records`;

    // getTasks(taskCategoryId: string) {
    //     if (!taskCategoryId)
    //         return EMPTY;
    //     const url = `${this.baseUrl}?filter=(task_category_id='${taskCategoryId}')`;
    //     return this.http.get<TaskListModel>(url).pipe(
    //         catchError(error => {
    //             console.log(error);
    //             return EMPTY;
    //         })
    //     );
    // }

     getTasks() {
        return this.http.get<TaskListModel>(this.baseUrl).pipe(
            catchError(error => {
                console.log(error);
                return EMPTY;
            })
        );
     }

    addTask(task: TaskModel): Observable<TaskModel> {
         return this.http.post<TaskModel>(this.baseUrl, task).pipe(
            catchError(error => {
                console.log(error);
                return EMPTY;
            })
        );
     }
    
    constructor(private http: HttpClient)
    { 
        
    }

}