import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from "./pagination-metadata";

export interface TaskCategory extends CollectionMetadata{
    title: string;
    icon: string;
    task_group_id?: string;
    can_modified: boolean;
}

export interface TaskCategoryListModel extends PaginationMetadata{
    items: TaskCategory[];
}