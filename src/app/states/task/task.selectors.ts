import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./task.reducers";
import * as TaskCategoryActions from "../task-category/task-category.selectors";
import { TaskModel } from "src/app/models/task.model";
import * as TaskCategorySelectors from '../task-category/task-category.selectors'
export const taskFeatureState = createFeatureSelector<TaskState>('tasksState');


export const tasks = createSelector(
    taskFeatureState,
    (state)=>state.tasks
)

export const loading = createSelector(
    taskFeatureState,
    (state)=>state.loading
)

export const error = createSelector(
    taskFeatureState,
    (state)=>state.error
)

// tasks with category

export const tasksWithCategory = createSelector(
    tasks,
    TaskCategorySelectors.selectTaskCategories,
    (tasks, taskCategories) => {
        const taskWithCat:ReadonlyArray<TaskModel>=tasks.map(task => {
            const category = taskCategories.find(a => a.id === task.task_category_id);
            return {
                ...task,
                categoryName: category ? category.title :""
            };
        });
        return taskWithCat;
    }
)

// if selected category is "Important" then return important task, otherwise return tasks
// releated to selected category
export const selectTasksBySelectedCategory = createSelector(
    tasksWithCategory,
    TaskCategoryActions.selectedTaskCategory,
    (taskState, selectedCategory) => {
        const tasks: readonly TaskModel[] = taskState;
        if (selectedCategory?.title === "Important") {
            return tasks.filter(a => a.isImportant);
        }
        else {
            return tasks.filter(
                task => task.task_category_id === selectedCategory?.id
            );
        }
        
    }
)


// return taskCategory with pending task count
export const selectTaskCategoriesWithCount = createSelector(
    TaskCategorySelectors.selectTaskCategories,
    taskFeatureState,
    (taskCategories, taskState) => {
        var importantCategory = taskCategories.find(a => a.title === "Important");
        // it would have category_id , count, but those category have no tasks will not present here
        const taskCounts = new Map<string, number>();
       // we will count every task which is pending, except tasks of category "Important"
        taskState.tasks
            .filter(task=>!task.completed && task.task_category_id!==importantCategory?.id)
            .forEach(task => {
            const count = taskCounts.get(task.task_category_id) || 0;
            taskCounts.set(task.task_category_id, count + 1);
            });
        // find all the task where isImportant is true
        const totalImportantTasks=taskState.tasks.filter(a => a.isImportant).length;
        if (importantCategory) {
            taskCounts.set(importantCategory.id, totalImportantTasks);
        }

        // map ervery category with count
        const categoriesWithCount = taskCategories.map(category => {
            const count = taskCounts.get(category.id) || 0;
            return { ...category, count }
        });

        return categoriesWithCount;
    }
)

export const selectSearchQuery = createSelector(
    taskFeatureState,
    (state)=>state.searchQuery
)

// select task by search query
// export const selectTasksBySearchQuery = createSelector(
//     selectTasksBySelectedCategory,
//     selectSearchQuery,
//     (tasks, searchQuery) => {
//       console.log('select task by search query called')
//       if (!searchQuery) 
//         return tasks;
//       const query = searchQuery.toLowerCase();
//       const filteredTasks= tasks.filter(task => 
//         task.title.toLowerCase().includes(query)
//         );
//      // console.log(filteredTasks);
//       return filteredTasks;
//     }
//   );
  
//   export const selectTasksBySearchQuery = (searchQuery:string) =>createSelector(
//     selectTasksBySelectedCategory,
//     (tasks) => {
//       if (!searchQuery) 
//         return tasks;
//       const query = searchQuery.toLowerCase();
//       const filteredTasks= tasks.filter(task => 
//         task.title.toLowerCase().includes(query)
//         );
//       console.log(filteredTasks);
//       return filteredTasks;
//     }
//   );



