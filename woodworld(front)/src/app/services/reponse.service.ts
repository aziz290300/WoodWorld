import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reponse } from '../models/Reponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private baseUrl: string = 'http://localhost:8085/Reponse/';

  constructor(private http: HttpClient) {}
  findAllReponse(): Observable<Reponse[]>{
    return this.http.get<Reponse[]> ( this.baseUrl + 'getAll' )
  }
  
  getReponseById(reponseId: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${this.baseUrl}get/${reponseId}`);
  }

  updateReponse(reponse:Reponse) : Observable<Reponse> {
    return this.http.put<Reponse> ( this.baseUrl + 'update',reponse);
  }

  deleteReponse(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }
  
  addReponseAndAffect(idreclamation: number, reponse: Reponse): Observable<any> {
    return this.http.post<Reponse>(`${this.baseUrl}${idreclamation}/addAndAffect`, reponse);
  }
}
