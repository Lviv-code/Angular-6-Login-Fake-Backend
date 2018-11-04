import {Injectable} from '@angular/core';
import {User} from '../user.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }
}
