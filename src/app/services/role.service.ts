import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../core/models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private Url = environment.apiUrl + '/Roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.Url);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.Url}/${id}`);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.Url, role);
  }

  updateRole(id: number, role: Role): Observable<void> {
    return this.http.put<void>(`${this.Url}/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/${id}`);
  }
}
