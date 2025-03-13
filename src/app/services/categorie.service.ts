import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Categorie {
  id?: number;
  libelle: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private Url = environment.apiUrl + '/Categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.Url);
  }

  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.Url}/${id}`);
  }

  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.Url, categorie, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateCategorie(id: number, categorie: Categorie): Observable<void> {
    return this.http.put<void>(`${this.Url}/${id}`, categorie, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/${id}`);
  }
}
