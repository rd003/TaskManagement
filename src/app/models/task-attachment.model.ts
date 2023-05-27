import { CollectionMetadata } from "./collection-metadata";
import { PaginationMetadata } from "./pagination-metadata";

export interface TaskAttachmentModel extends CollectionMetadata{
    id: string,
    task_id: string,
    attachment: string,
    file_path:string
}

export interface TaskAttachmentListModel extends PaginationMetadata{
    items:TaskAttachmentModel[]
}