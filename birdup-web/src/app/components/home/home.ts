import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { SearchForm } from '../search-form/search-form';
import Sighting from '../../services/sighting.models';
import SightingService from '../../services/sighting';
import { assertCannotReach, SearchOptions } from '../../models/search-options';
import { catchError } from 'rxjs';
import { SearchResults } from '../search-results/search-results';
import { SightingMap } from '../sighting-map/sighting-map';
import { SearchFormModel } from "../../models/search-options";

@Component({
  selector: 'app-home',
  imports: [SearchForm, SearchResults],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  private sightingService = inject(SightingService);
  protected readonly sightings = signal<Sighting[]>([]);

  // Model for search form is flattened compared to search options
  // type used to query results from api
  protected searchData = signal<SearchOptions>({
    type: "Region",
    notable: false,
    searchTerm: "",
  });

  protected readonly load = signal<boolean>(false);

  getSightings(): void {
    const options = this.searchData();

    switch (options.type) {
      case "Region":
        const { searchTerm, notable } = options;
        console.log(`search term is: ${searchTerm}`);
        this.sightingService.getSightingByRegion(searchTerm.trim(), notable)
          .pipe()
          .subscribe((sightings) => {
            console.log(sightings);
            this.sightings.set(sightings);
          });
        break;

      case "Coordinate":
        // const { coordinates, radius, notable }= options;
        this.sightingService.getSightingByCoordinates(options.coordinates,
          options.notable, options.radius)
          .pipe()
          .subscribe((sightings) => {
            console.log(sightings);
            this.sightings.set(sightings);
          })
        break;

      default:
        assertCannotReach(options);
    }
  }
}
