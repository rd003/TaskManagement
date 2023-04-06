import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './ui/side-nav/side-nav.component';
import { MainLayoutComponent } from './ui/main-layout/main-layout.component';
import { SidenavBrandComponent } from './ui/sidenav-brand/sidenav-brand.component';
import { SidenavSearchComponent } from './ui/sidenav-search/sidenav-search.component';
import { SidenavLinksComponent } from './ui/sidenav-links/sidenav-links.component';
import { AppSidenavBottomComponent } from './ui/sidenav-bottom/app-sidenav-bottom.component';
import { ContentComponent } from './ui/content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentPageHeadingComponent } from './ui/content-page-heading/content-page-heading.component';

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
    ContentPageHeadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
