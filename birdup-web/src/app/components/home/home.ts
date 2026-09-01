import { Component, inject, signal } from '@angular/core';
import { SearchBox } from '../search-box/search-box';
import { SightingCard } from '../sighting-card/sighting-card';
import Sighting from '../../services/sighting.models';
import SightingService from '../../services/sighting';
import {SearchInfo} from '../../models/search-info';
import { catchError } from 'rxjs';
import {SearchResults} from '../search-results/search-results';
import {SightingMap} from '../sighting-map/sighting-map';

@Component({
  selector: 'app-home',
  imports: [
    SearchBox,
    SearchResults,
    SightingMap,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private sightingService = inject(SightingService);
  // TODO convert messy search form into reactive one
  // protected readonly sightings = signal<Map<number, Sighting>>(new Map());
  protected readonly sightings = signal<Sighting[]>([]);

  // protected readonly searchData = signal<SearchInfo>({ regionCode: "", notable: false });
  protected searchData = signal<SearchInfo>({regionCode: ""});

  protected readonly load = signal<boolean>(false);

  /*
  * @param regionCode
  */
  getSightings(): void {
    const { regionCode } = this.searchData();
    this.sightingService.getSightingByRegion(regionCode.trim())
      .pipe(
        catchError((err) => {
          throw err;
        })
      ).subscribe((sightings) => {
        console.log(this.sightings);
      // this.sightings.set(new Map(sightings.map((sighting, index) => [index, sighting])));
      this.sightings.set(sightings);

      });
  }
}
