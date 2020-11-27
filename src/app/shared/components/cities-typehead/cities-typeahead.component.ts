import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CityTypeaheadItem } from '../../models/city-typeahead-item';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'fn-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss']
})
export class CitiesTypeaheadComponent implements OnInit {

  dataSource$: Observable<CityTypeaheadItem[]>;
  search: string;

  constructor(private citiesServices: CitiesService) { }

  ngOnInit() {
    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search)
    )
      .pipe(
        switchMap((query: string) => this.citiesServices.getCities(query))
      );
  }

  onSelected(match: TypeaheadMatch) {
    console.log(match.item);
  }

}
