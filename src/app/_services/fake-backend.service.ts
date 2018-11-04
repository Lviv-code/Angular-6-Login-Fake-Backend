import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, pipe, throwError} from 'rxjs';
import {User} from '../user.model';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const users: User[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null).pipe(mergeMap(() => {

      // login
      if (req.url.endsWith('/users/authenticate') && req.method === 'POST') {
        const userFiltered = users.filter(data => {
          return data.username === req.body.username && data.password === req.body.password;
        });
        if (userFiltered.length) {
          const body = {
            id: userFiltered[0].id,
            username: userFiltered[0].username,
            password: userFiltered[0].password,
            token: 'fake-token'
          };
          return of(new HttpResponse({status: 200, body: body}));
        } else {
          return throwError({error: {message: 'Username or password incorrect 123'}});
        }
      }

      // register
      if (req.url.endsWith('/users/register') && req.method === 'POST') {
        const newUser: User = req.body;

        const check = users.filter(value => {
          return value.username === newUser.username;
        }).length;

        if (check) {
          return throwError({error: {message: `Username "${newUser.username}" is already taken`}});
        }
        newUser.id = users.length + 1;
        users[users.length] = newUser;
        localStorage.setItem('users', JSON.stringify(users));

        return of(new HttpResponse({status: 200}));
      }
      return next.handle(req);


    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

