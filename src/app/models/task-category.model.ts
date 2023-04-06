import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from "./pagination-metadata";

export interface TaskCategory extends CollectionMetadata{
    title: string;
}

export interface TaskCategoryList extends PaginationMetadata{
    items: TaskCategory[];
}