import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';
import * as fromHomeActions from '../../state/home.actions';
import * as fromHomeSelectors from '../../state/home.selectors';
import * as fromBookmarksSelectors from '../../../bookmarks/state/bookmark.selectors';

@Component({
  selector: 'fn-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit, OnDestroy {

  cityWeather$: Observable<CityWeather>;
  cityWeather: CityWeather;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  bookmarksList$: Observable<Bookmark[]>;
  isCurrentFavorite$: Observable<boolean>;

  searchControl: FormControl;
  searchControlWithAutocomplete: FormControl;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store) { }

  ngOnInit() {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutocomplete = new FormControl(undefined);
    this.searchControlWithAutocomplete.valueChanges
      .subscribe(value => console.log(value));

    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.cityWeather = value);
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));

    this.bookmarksList$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarkList));

    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
        .pipe(
          map(([current, bookmarksList]) => {
            if (!!current) {
              return bookmarksList.some(bookmark => bookmark.id === current.city.id);
            }
            return false;
          }),
        );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }

  onToggleBookmark() { 
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.coord = this.cityWeather.city.coord;
    bookmark.country = this.cityWeather.city.country;
    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }

}
