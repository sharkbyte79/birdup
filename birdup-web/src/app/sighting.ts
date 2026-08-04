import { inject, Injectable } from '@angular/core';
import Sighting from './sighting.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class SightingService {
  private readonly endpoint: string = "sightings";
  private http: HttpClient = inject(HttpClient);

  getSightingByRegion(regionCode: string): Observable<Sighting[]> {
    return this.http.get<Sighting[]>(`${this.endpoint}/${regionCode}`);
  }

  getNotableSightingsByRegion(regionCode: string): Observable<Sighting[]> {
    return this.http.get<Sighting[]>(`${this.endpoint}/${regionCode}/notable`);
  }
}

