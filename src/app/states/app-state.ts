import * as fromTaskCategory from './task-category/task-categories.reducres'
import * as fromTask from './task/task.reducers'
import * as fromTaskCategoryLink from './task-category-link/task-category-link.reducers'
export interface AppState{
    taskCategories: fromTaskCategory.TaskCategoryState,
    tasksState: fromTask.TaskState,
    taskCategoryLink: fromTaskCategoryLink.TaskCategoryLinkState
}