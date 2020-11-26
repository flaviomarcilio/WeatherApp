import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { BookmarkState } from '../../state/bookmarks.reducer';
import * as fromBookmarksSelectors from '../../state/bookmark.selectors';
import * as fromBookmarksActions from '../../state/bookmarks.actions';

@Component({
  selector: 'fn-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss']
})

export class BookmarksPage implements OnInit {

  bookmarks$: Observable<Bookmark[]>;


  constructor(private store: Store<BookmarkState>) { }

  ngOnInit(): void {
    this.bookmarks$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarkList));
  }

  removeBookmark(id: number) {
    this.store.dispatch(fromBookmarksActions.removeBookmark({ id }));
  }

}
