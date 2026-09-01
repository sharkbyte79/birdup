import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint: string = "users";
  private http: HttpClient = inject(HttpClient);

  createUser({userId, displayName, email}: CreateUserRequest) {
    let payload: CreateUserRequest = {userId, displayName, email};
    this.http.post(this.endpoint, payload)
      .subscribe((res) => {
        console.log(res);
      });
  }
}

interface CreateUserRequest {
  userId: string;
  displayName: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
