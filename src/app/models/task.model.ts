import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from "./pagination-metadata";

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
    isImortarant:        boolean;
}

export interface TaskListModel extends PaginationMetadata{
    items:TaskModel[]
}