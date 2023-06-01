import * as fromTaskCategory from './task-category/task-categories.reducres'
import * as fromTask from './task/task.reducers'
import * as fromTaskCategoryLink from './task-category-link/task-category-link.reducers'
import * as fromTaskAttachments from './task-attachment/task-attachment.reducers'
export interface AppState{
    taskCategories: fromTaskCategory.TaskCategoryState,
    tasksState: fromTask.TaskState,
    taskCategoryLink: fromTaskCategoryLink.TaskCategoryLinkState,
    taskAttachments: fromTaskAttachments.TaskAttachmentState
}