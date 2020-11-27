import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DetailsPage } from './containers/details/details.page';
import { DetailsGuard } from './services/details.guard';
import { detailsReducer } from './state/details.reducer';
import { DetailsEffects } from './state/details.effects';

@NgModule({
  declarations: [
    DetailsPage
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    RouterModule.forChild([
      { path: '', component: DetailsPage, canActivate: [DetailsGuard] },
    ]),
  ],
  providers: [
    DetailsGuard,
  ],
})

export class DetailsModule { }
