import {Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { catchError, delay, EMPTY, Observable, of, tap, throwError } from "rxjs";
import { TaskListModel, TaskModel } from "../models/task.model";

@Injectable({ providedIn:'root'})
export class TaskService{
    private baseUrl = `${environment.baseUrl}/collections/task/records`;

     getTasks() {
        return this.http.get<TaskListModel>(this.baseUrl).pipe(
            catchError(error => {
                console.log(error);
                return throwError(()=>error);
            })
        );
     }

    addTask(task: TaskModel): Observable<TaskModel> {
         return this.http.post<TaskModel>(this.baseUrl, task).pipe(
            catchError(error => {
                console.log(error);
                return throwError(()=>error);
            })
        );
    }
    
    updateTask(task: TaskModel): Observable<TaskModel> {
        console.log(task)
        const url = `${this.baseUrl}/${task.id}`;
        return this.http.patch<TaskModel>(url, task).pipe(
            catchError(error => {
                console.log({'💩💩': error });
                return throwError(()=>error);
            })
        );
    }
    
    constructor(private http: HttpClient)
    { 
       
    }

}