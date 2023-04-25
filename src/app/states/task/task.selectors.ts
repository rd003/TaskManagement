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

// if selected category is "Important" then return important task, otherwise return tasks
// releated to selected category
export const selectTasksBySelectedCategory = createSelector(
    taskFeatureState,
    TaskCategoryActions.selectedTaskCategory,
    (taskState, selectedCategory) => {
        const tasks: readonly TaskModel[] = taskState.tasks;
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



