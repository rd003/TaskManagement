import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TaskAttachmentCreateModel, TaskAttachmentListModel, TaskAttachmentModel } from '../models/task-attachment.model';

@Injectable({
  providedIn: 'root'
})
export class TaskAttachmentService {
  private baseUrl = environment.baseUrl + '/collections/task_attachment/records';
  private fileUrl = environment.baseUrl + '/files';

  uploadFile(taskReq:TaskAttachmentCreateModel):Observable<TaskAttachmentModel>  {
   // console.log({task_id,file})
    // const formData: FormData = new FormData();
    // formData.append("task_id", taskReq.task_id);
    // formData.append("attachment", taskReq.file);
    // return this.http.post<TaskAttachmentModel>(this.baseUrl, formData);
    const attchmt: TaskAttachmentModel = {
      id: 'abc',
      attachment: taskReq.file.name,
      file_path: 'aa/asdf/',
      collectionId: 'abc',
      collectionName: 'asdf',
      created: 'ssss', updated: '',
      task_id: taskReq.task_id
    };
    return of(attchmt);
  }

  getAllAttachment(): Observable<TaskAttachmentModel[]> {
    return this.http.get<TaskAttachmentListModel>(this.baseUrl).pipe(
      map(a => {
        const newItems = a.items.map(attachment => {
          attachment.file_path = `${this.fileUrl}/${attachment.collectionId}/${attachment.id}/${attachment.attachment}`;
          return attachment;
        });
       return newItems
     })
    );
  }
  constructor(private http:HttpClient) { }
}
