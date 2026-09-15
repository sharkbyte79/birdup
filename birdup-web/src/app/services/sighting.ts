import { inject, Injectable } from '@angular/core';
import Sighting from './sighting.models';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class SightingService {
  private readonly endpoint: string = "sightings";
  private http: HttpClient = inject(HttpClient);

  getSightingByRegion(regionCode: string, notable: boolean): Observable<Sighting[]> {
    return this.http.get<Sighting[]>(`${this.endpoint}/${regionCode}${notable ? "/notable" : ""}`);
  }

  getSightingByCoordinates(coordinates: number[], notable: boolean, radius: number) {
    const params = new HttpParams()
        .set("lat", coordinates[1])
        .set("lng", coordinates[0])
        .set("rad", radius);

    return this.http.get<Sighting[]>(`${this.endpoint}${notable ? "/notable" : ""}`, {params})
  }
}

