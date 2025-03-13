import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Url = environment.apiUrl + '/Users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.Url);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.Url}/${id}`);
  }

  createUser(formData: FormData): Observable<User> {
    return this.http.post<User>(this.Url, formData)
     // .subscribe(response => console.log(response));
    }

  /**
   * 🔹 Créer un utilisateur avec une image optionnelle
   * @param user Objet utilisateur (JSON)
   * @param file Fichier image (optionnel)
   */
  // createUser(user: any, file?: any): Observable<any> {
  //   const formData = new FormData();
  //
  //   // ✅ Convertir l'objet user en JSON string et l'ajouter à FormData
  //   const userJson = JSON.stringify(user);
  //   formData.append('user', userJson);
  //
  //   // ✅ Ajouter le fichier seulement s'il existe
  //   if (file) {
  //     formData.append('file', file);
  //   }
  //
  //   console.log("formData:",formData)
  //
  //   // ✅ Vérifier ce qui est envoyé
  //   formData.forEach((value, key) => {
  //     console.log(`${key}:`, value);
  //   });
  //
  //   return this.http.post(this.Url, formData);
  // }


  updateUser(id: number, user: FormData): Observable<void> {
    return this.http.put<void>(`${this.Url}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/${id}`);
  }

  uploadUserFiles(userId: number, formData: FormData): Observable<any> {
    const url = `${this.Url}/${userId}/upload-files`;
    return this.http.post<any>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }


  getUsersWithFilters(filters: any): Observable<any> {
    return this.http.get<any>(`${this.Url}/filtres`, { params: filters });
  }

  getUsersWithRole(filters: any): Observable<any> {
    return this.http.get<any>(`${this.Url}/filtres-role`, { params: filters });
  }

  assignRoleToUser(userId: number, roleId: number): Observable<any> {
    return this.http.post<any>(`${this.Url}/${userId}/assign-role/${roleId}`, {});
  }

  getUserRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/user_role`);
  }

  getUserRolesByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.Url}/user_role/${id}`);
  }
}
