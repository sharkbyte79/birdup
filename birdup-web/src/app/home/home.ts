import { Component, inject, signal } from '@angular/core';
import { SearchBox } from '../search-box/search-box';
import { SightingCard } from '../sighting-card/sighting-card';
import Sighting from '../sighting.models';
import SightingService from '../sighting';
import { SearchInfo } from '../models/search-info';
import { catchError } from 'rxjs';
import {SearchResults} from '../components/search-results/search-results';

@Component({
  selector: 'app-home',
  imports: [
    SearchBox,
    SightingCard,
    SearchResults,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private sightingService = inject(SightingService);
  // TODO convert messy search form into reactive one
  protected readonly sightings = signal<Sighting[]>([]);

  // protected readonly searchData = signal<SearchInfo>({ regionCode: "", notable: false });
  protected readonly searchData = signal<SearchInfo>({ regionCode: "" });

  /*
  * @param regionCode
  */
  getSightings(): void {
    console.log("meow");
    const { regionCode } = this.searchData();
    this.sightingService.getSightingByRegion(regionCode.trim())
      .pipe(
        catchError((err) => {
          throw err;
        })
      ).subscribe((sightings) => {
        this.sightings.set(sightings);
        console.log(this.sightings);
      });
  }
}
