import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reclamation } from '../models/Reclamation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl: string = 'http://localhost:8085/Reclamation/';

  constructor(private http: HttpClient) {}
  findAllReclamation(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]> ( this.baseUrl + 'getAll' )
  }
  
  getReclamationById(reclamationId: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.baseUrl}get/${reclamationId}`);
  }
 
  
  addReclamation(reclamation:Reclamation) : Observable<Reclamation> {
    return this.http.post<Reclamation> ( this.baseUrl + 'add', reclamation );
  }

  updateReclamation(reclamation:Reclamation) : Observable<Reclamation> {
    return this.http.put<Reclamation> ( this.baseUrl + 'update', reclamation);
  }

  deleteReclamation(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }
 
  tri(){
    return this.http.get<Reclamation[]>( this.baseUrl + 'tri');

  }
  getAllReclamationsSortedByImportance(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.baseUrl + 'reclamations/sorted');
  }

  getReclamationsByType(type: string): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}type/${type}`);
  }

}
