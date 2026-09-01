import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private readonly endpoint: string = "follows";
  private http: HttpClient = inject(HttpClient);

  createFollow() {

  }

  getFollowsForUser(): Observable<{ regionCode: string, createdAt: Date }> {
    return this.http.get<any>(`${this.endpoint}`);
  }

}
