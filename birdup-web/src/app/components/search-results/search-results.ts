import { Component, input } from '@angular/core';
import Sighting from '../../sighting.models';
import { SightingCard } from '../../sighting-card/sighting-card';
import {TuiTitle} from '@taiga-ui/core';

@Component({
  selector: 'app-search-results',
  imports: [
    SightingCard,
    TuiTitle
  ],
  templateUrl: './search-results.html',
  styleUrl: './search-results.less',
})
export class SearchResults {
  readonly results = input<Sighting[]>([]);
  readonly regionCode = input<string>("");

}
