import {Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { TaskCategoryListModel } from "../models/task-category.model";
import { catchError, EMPTY } from "rxjs";

@Injectable({ providedIn:'root'})
export class TaskCategoryService{
    private baseUrl = `${environment.baseUrl}/task_category/records`;

    getTaskCategories() {
        return this.http.get<TaskCategoryListModel>(this.baseUrl).pipe(
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