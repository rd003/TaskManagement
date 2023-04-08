import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from "./pagination-metadata";

export interface TaskCategory extends CollectionMetadata{
    title: string;
    icon: string;
}

export interface TaskCategoryListModel extends PaginationMetadata{
    items: TaskCategory[];
}