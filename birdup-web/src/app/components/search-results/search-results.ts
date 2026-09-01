import { Component, input } from '@angular/core';
import Sighting from '../../services/sighting.models';
import {SightingCard} from '../sighting-card/sighting-card';
import {TuiButton, TuiIcon, TuiTitle} from '@taiga-ui/core';

@Component({
  selector: 'app-search-results',
  imports: [
    SightingCard,
    TuiTitle,
    TuiButton,
    TuiIcon
  ],
  templateUrl: './search-results.html',
  styleUrl: './search-results.less',
})
export class SearchResults {
  // readonly results = input<Map<number, Sighting>>(new Map());
  readonly results = input<Sighting[]>([]);
  readonly regionCode = input<string>("");
  readonly loading = input<boolean>(false);
}
