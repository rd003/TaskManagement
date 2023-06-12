import {createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskModel } from "src/app/models/task.model";

export const SelectedTaskActions = createActionGroup({
    source: 'SelectedTasks',
    events: {
        'Select Task': props<{ task: TaskModel }>(),
        'Remove Selected Task': emptyProps()
    }
}
)

// export const selectTask = createAction('[SelectedTasks] Select Task', props<{ task: TaskModel }>());
// export const removeSelectedTask = createAction('[SelectedTasks] Remove Selected Task');