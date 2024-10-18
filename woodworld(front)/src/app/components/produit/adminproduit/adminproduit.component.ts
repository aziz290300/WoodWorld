import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/Produit';
import { ProcessingImageServiceService } from 'src/app/services/processing-image-service.service';
import { ProduitserviceService } from 'src/app/services/produitservice.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-adminproduit',
  templateUrl: './adminproduit.component.html',
  styleUrls: ['./adminproduit.component.css']
})
export class AdminproduitComponent {
  produits: Produit[] = [];

  constructor(
    private r: Router,
    private http: ProduitserviceService, 
    public p: ProcessingImageServiceService
  ) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  public loadDossiers() {
    this.http.getAllProduits()
      .pipe(
        map((x: Produit[]) => x.map((course: Produit) => this.p.createImage(course)))
      )
      .subscribe(
        (resp: Produit[]) => {
          this.produits = resp;
        }
      );
  }

  // Méthode pour naviguer vers la page d'ajout
  navigateToAdd(): void {
    this.r.navigate(['/admin/addproduits']);
  }

  // Méthode pour naviguer vers la page de modification d'un produit avec l'ID
  navigateToUpdate(id: number): void {
    this.r.navigate(['/admin/upproduits', id]);
  }
  // AdminproduitComponent.ts

deleteProduit(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    this.http.deleteProduit(id).subscribe(
      () => {
        console.log('Produit supprimé avec succès');
        this.loadDossiers();  // Rechargez la liste des produits après suppression
      },
      error => {
        console.error('Erreur lors de la suppression du produit :', error);
      }
    );
  }
}

}
