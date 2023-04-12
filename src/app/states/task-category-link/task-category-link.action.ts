import { createActionGroup, emptyProps } from "@ngrx/store";

export const TaskCategoryLinkActions = createActionGroup({
    source: 'TaskCategoryLink',
    events: {
      'Toggle Add New TaskCategory Input': emptyProps()
    }
}
)