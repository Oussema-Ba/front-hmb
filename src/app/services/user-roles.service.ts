import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRole} from '../core/models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {


  private Url = environment.apiUrl + '/UserRoles';

  constructor(private http: HttpClient) {}

  getUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.Url);
  }

  getUserRole(id: number): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.Url}/${id}`);
  }

  createUserRole(userRole: UserRole): Observable<UserRole> {
    return this.http.post<UserRole>(this.Url, userRole);
  }

  updateUserRole(id: number, userRole: UserRole): Observable<void> {
    return this.http.put<void>(`${this.Url}/${id}`, userRole);
  }

  deleteUserRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/${id}`);
  }
}
