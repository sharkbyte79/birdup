import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import Sighting from '../../services/sighting.models';
import { SightingCard } from '../sighting-card/sighting-card';
import { TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core';
import {TuiShimmer} from '@taiga-ui/kit';

@Component({
  selector: 'app-search-results',
  imports: [SightingCard, TuiTitle, TuiButton, TuiIcon, TuiShimmer],
  templateUrl: './search-results.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-results.less',
})
export class SearchResults {
  // readonly results = input<Map<number, Sighting>>(new Map());
  readonly results = input<Sighting[]>([]);
  readonly searchTerm = input<string | number[]>('');
  readonly loading = input<boolean>(false);
}
