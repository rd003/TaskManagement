import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from "./pagination-metadata";
import { TaskAttachmentModel } from "./task-attachment.model";

export interface TaskModel extends CollectionMetadata {
    title:               string;
    task_category_id:    string;
    completed:           boolean;
    due_date:            string;
    note:                string;
    repeat_type:         string;
    repeat_interval:     number;
    last_completed_date: string;
    reminder_date:       string;
    isImportant: boolean;
    categoryName: string;
    taskAttachments?: TaskAttachmentModel[]
}

export interface TaskListModel extends PaginationMetadata{
    items:TaskModel[]
}