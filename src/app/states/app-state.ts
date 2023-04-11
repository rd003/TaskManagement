import * as fromTaskCategory from './task-category/task-categories.reducres'
import * as fromTask from './task/task.reducers'
export interface AppState{
    taskCategories: fromTaskCategory.TaskCategoryState,
    tasksState:fromTask.TaskState
}