import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl = environment.apiUrl + '/auth';


  constructor(private httpClient: HttpClient) { }

  authenticate(username: any, password: any) {


    let userData:any = this.httpClient.post(environment.apiUrl+'/auth/login',
    {"username":username,"password":password}).pipe(
      map(
        (data:any) => {
          sessionStorage.setItem('token', data.token);
           userData = data;

        }
      )
    );
    return userData;
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('token')
    return !(user === null)
  }
  logOut() {
    sessionStorage.removeItem('token')
  }

  register(user: FormData): Observable<any> {
    return this.httpClient.post(`${this.authUrl}/register`, user);
  }
}
