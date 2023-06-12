import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './ui/side-nav/side-nav.component';
import { MainLayoutComponent } from './ui/main-layout/main-layout.component';
import { SidenavBrandComponent } from './ui/side-nav/sidenav-brand/sidenav-brand.component';
import { SidenavSearchComponent } from './ui/side-nav/sidenav-search/sidenav-search.component';
import { SidenavLinksComponent } from './ui/side-nav/sidenav-links/sidenav-links.component';
import { AppSidenavBottomComponent } from './ui/side-nav/sidenav-bottom/app-sidenav-bottom.component';
import { ContentComponent } from './ui/content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskCategoriesReducer } from './states/task-category/task-categories.reducres';
import { TaskCategoriesEffects } from './states/task-category/task-category.effects';
import { SidenavLinksListComponent } from './ui/side-nav/sidenav-links-list/sidenav-links-list.component';
import { taskReducer } from './states/task/task.reducers';
import { TaskEffects } from './states/task/task.effects';
import { AppState } from './states/app-state';
import { TaskDisplayComponent } from './ui/content/task-display/task-display.component';
import { PageHeadingComponent } from './ui/content/page-heading/page-heading.component';
import { taskCategoryLinkReducer } from './states/task-category-link/task-category-link.reducers';
import { AddTaskComponent } from './ui/content/add-task/add-task.component';
import { RadioComponent } from './ui/content/add-task/radio/radio.component';
import { PlusIconComponent } from './ui/content/add-task/plus-icon/plus-icon.component';
import { InputFieldComponent } from './ui/content/add-task/input-field/input-field.component';
import { RightButtonsComponent } from './ui/content/add-task/right-buttons/right-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownMenuComponent } from './ui/util/dropdown-menu/dropdown-menu.component';
import { EditModalComponent } from './ui/edit-modal/edit-modal.component';
import { TaskAttachmentEffects } from './states/task-attachment/task-attachment.effects';
import { TaskAttachmentReducer } from './states/task-attachment/task-attachment.reducers';
import { selectedTaskReducer } from './states/selected-task/selected-task.reducers';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MainLayoutComponent,
    SidenavBrandComponent,
    SidenavSearchComponent,
    SidenavLinksComponent,
    AppSidenavBottomComponent,
    ContentComponent,
    SidenavLinksListComponent,
    TaskDisplayComponent,
    PageHeadingComponent,
    AddTaskComponent,
    RadioComponent,
    PlusIconComponent,
    InputFieldComponent,
    RightButtonsComponent,
    DropdownMenuComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot<AppState>({
      taskCategories: taskCategoriesReducer,
      tasksState: taskReducer,
      taskCategoryLink: taskCategoryLinkReducer,
      taskAttachments: TaskAttachmentReducer,
      selectedTask:selectedTaskReducer
    }),
    EffectsModule.forRoot([TaskCategoriesEffects,TaskEffects,TaskAttachmentEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
