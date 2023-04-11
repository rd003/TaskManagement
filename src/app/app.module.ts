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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({
      taskCategories: taskCategoriesReducer,
      tasksState: taskReducer
    }),
    EffectsModule.forRoot([TaskCategoriesEffects,TaskEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
