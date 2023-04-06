import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from './pagination-metadata';

export interface TaskGroupList extends PaginationMetadata  {
    items: TaskGroup[];
}

export interface TaskGroup extends CollectionMetadata {
    title: string;
}
