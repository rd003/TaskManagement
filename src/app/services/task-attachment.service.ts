import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TaskAttachmentListModel, TaskAttachmentModel } from '../models/task-attachment.model';

@Injectable({
  providedIn: 'root'
})
export class TaskAttachmentService {
  baseUrl = environment.baseUrl + '/collections/task_attachment/records';
  fileUrl = environment.baseUrl + '/files';
  uploadFile(task_id: string, file: File):Observable<TaskAttachmentModel>  {
   // console.log({task_id,file})
    const formData: FormData = new FormData();
    formData.append("task_id", task_id);
    formData.append("attachment", file);
    return this.http.post<TaskAttachmentModel>(this.baseUrl, formData);
  }

  getAllAttachment(): Observable<TaskAttachmentModel[]> {
    return this.http.get<TaskAttachmentListModel>(this.baseUrl).pipe(
      map(a => {
        const newItems = a.items.map(attachment => {
          attachment.file_path = `${this.fileUrl}/${attachment.collectionId}/${attachment.id}/${attachment.attachment}`;
          return attachment;
        });
       return a.items
     })
    );
  }
  constructor(private http:HttpClient) { }
}
