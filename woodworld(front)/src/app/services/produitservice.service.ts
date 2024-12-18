import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/Produit'; // Votre modèle Angular pour le produit
import { FileHandle } from '../models/FileHandle'; // Votre modèle Angular pour ImageData

@Injectable({
  providedIn: 'root'
})
export class ProduitserviceService {

  private baseUrl: string = 'http://localhost:8085/Produit/';

  constructor(private http: HttpClient) {}

  // Ajouter un produit avec des fichiers
  addProduit(produit: Produit, files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    
    // Sérialiser le produit en JSON
    formData.append('produit', JSON.stringify(produit));
    
    // Ajouter les fichiers au FormData
    files.forEach((file, index) => {
      formData.append('file', file, file.name);
    });

    return this.http.post(`${this.baseUrl}addproduit`, formData, {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data' -> ne pas ajouter cela, Angular le gère automatiquement pour FormData
      }),
      responseType: 'text'  // Si l'API renvoie une chaîne de caractères, vous pouvez utiliser 'text'
    });
  }

  // Récupérer tous les produits
  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}getAll`);
  }

  // Récupérer un produit par ID
  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}get/${id}`);
  }

  // Supprimer un produit par ID
  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${id}`, {
      responseType: 'text' // Si l'API renvoie une chaîne de caractères après suppression
    });
  }

  // Mettre à jour un produit
  updateProduit(produit: Produit, files: File[]): Observable<any> {
    const formData: FormData = new FormData();
  
    // Sérialiser le produit en JSON
    formData.append('produit', JSON.stringify(produit));
  
    // Ajouter les fichiers au FormData, s'il y en a
    files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });
  
    return this.http.put(`${this.baseUrl}update`, formData, {
      headers: new HttpHeaders({}),
      responseType: 'text'  // Si l'API renvoie une chaîne de caractères
    });
  }
  

  // Mettre à jour les images d'un produit
  updateImages(imageData: ImageData): Observable<ImageData> {
    return this.http.put<ImageData>(`${this.baseUrl}updateImgs`, imageData);
  }
  public getImageUrl(fileName: string): string {
    return `http://localhost:8085/image/${fileName}`;
  }
 
}

