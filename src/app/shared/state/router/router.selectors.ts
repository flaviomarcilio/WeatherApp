import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterState } from './router.reducer';

const selectRouterReducerState = createFeatureSelector<RouterReducerState<RouterState>>('router')

export const selectRouteState = createSelector(
    selectRouterReducerState,
    (routerReducerState: RouterReducerState<RouterState>) => (routerReducerState && routerReducerState.state) || {},
);

export const selectRouterQueryParams = createSelector(
    selectRouteState,
    (routerState: RouterState) => (routerState && routerState.queryParams) || {},
);