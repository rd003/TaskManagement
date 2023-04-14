import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskCategoryState } from "./task-categories.reducres";
// import * as TaskSelectors from '../task/task.selectors';

export const selectTaskCategoryState = createFeatureSelector<TaskCategoryState>('taskCategories');

export const selectTaskCategories = createSelector(
    selectTaskCategoryState,
    (state) => {
        return state.taskCategories;
    }
)

export const selectTaskCategoriesLoading = createSelector(
    selectTaskCategoryState,
    state=>state.loading
)

export const selectTaskCategoriesError = createSelector(
    selectTaskCategoryState,
    state=>state.error
)

export const selectedTaskCategory = createSelector(
    selectTaskCategoryState,
    state=>state.selectedTaskCategory
)

// export const selectTaskCategoriesWithCounts = createSelector(
//     selectTaskCategoryState,
//     TaskSelectors.taskFeatureState,
//     (taskCategoryState, tasksState) => {
//       const selectedCategory = taskCategoryState.selectedTaskCategory;
//       const selectedCategoryTasks = tasksState.tasks.filter(task => task.task_category_id === selectedCategory?.id);
//       const count = selectedCategoryTasks.length;
//       return taskCategoryState.taskCategories.map(taskCategory => {
//         if (taskCategory.id === selectedCategory?.id) {
//           return { ...taskCategory, count };
//         } else {
//           return { ...taskCategory, count: 0 };
//         }
//       });
//     }
//   );
  
