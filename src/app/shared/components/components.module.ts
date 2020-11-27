import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { LoaderComponent } from './loader/loader.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { CitiesTypeaheadComponent } from './cities-typehead/cities-typeahead.component';


@NgModule({
  declarations: [
    LoaderComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule.forRoot(),
  ],
  exports: [
    LoaderComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent,
  ]
})
export class ComponentsModule { }
