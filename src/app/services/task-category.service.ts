import {Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { TaskCategory, TaskCategoryListModel } from "../models/task-category.model";
import { catchError, EMPTY, map, Observable, of } from "rxjs";

@Injectable({ providedIn:'root'})
export class TaskCategoryService{
    private baseUrl = `${environment.baseUrl}/collections/task_category/records`;

    getTaskCategories() {
        return this.http.get<TaskCategoryListModel>(this.baseUrl).pipe(
            catchError(error => {
                console.log(error);
                return EMPTY;
            })
        );
    }

    getDefaultCategory():Observable<TaskCategory> {
        const url = `${this.baseUrl}?filter=(title='Tasks' || title='tasks')`;
        return this.http.get<TaskCategoryListModel>(url).pipe(
            map(response=>response.items[0]),
            catchError(error => {
                console.log(error);
                return EMPTY;
            })
        );
    }

    addTaskCategory(taskCategory: TaskCategory):Observable<TaskCategory> {
        //return of(taskCategory)
       return this.http.post<TaskCategory>(this.baseUrl, taskCategory);
    }

    constructor(private http: HttpClient)
    { 
        
    }

}