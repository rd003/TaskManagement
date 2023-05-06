import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/states/app-state';
import * as TaskSelectors from '../../../states/task/task.selectors';
import { TaskActions } from 'src/app/states/task/task.actions';

@Component({
  selector: 'app-sidenav-search',
  template: `
    <div class="searchbar relative mb-4">
               <!-- input search box -->
              <input type="text" [formControl]="searchInput" placeholder="Search"   class="w-full rounded-lg border border-gray-400 py-1 px-3"/>
              <!-- search icon relative to search input box -->
              <div class="icon absolute h-full w-12 flex items-center justify-center top-0 right-0">
                <i class="fas fa-search text-gray-600"></i>
              </div>
           </div>
  `,
  styles: [
  ]
})
export class SidenavSearchComponent implements OnInit,OnDestroy {
  searchInput = new FormControl('');
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        tap(val => {
          if (!val) return
          //this._store.select(TaskSelectors.selectTasksBySearchQuery(val)).subscribe()
          this._store.dispatch(TaskActions.setSearchQuery({ searchQuery: val }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  constructor(private _store: Store<AppState>) {
    
  }


}
