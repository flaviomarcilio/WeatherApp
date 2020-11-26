import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookmarkState } from './bookmarks.reducer';

export const selectBookmarkState = createFeatureSelector('bookmarks');

export const selectBookmarkList = createSelector(
    selectBookmarkState,
    (bookmarkState: BookmarkState) => bookmarkState.list,
)