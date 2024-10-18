import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit, Category, Souscategory, Typesproduit } from 'src/app/models/Produit';
import { ProcessingImageServiceService } from 'src/app/services/processing-image-service.service';
import { ProduitserviceService } from 'src/app/services/produitservice.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  produits: Produit[] = [];
  
  // Define the structure for the grouped products
  produitsGroupedByCategory: {
    [key in Category]?: {
      [key in Souscategory]?: {
        [key in Typesproduit]?: Produit[]
      }
    }
  } = {};

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
        map((x: Produit[]) => x.map((prod: Produit) => this.p.createImage(prod)))
      )
      .subscribe(
        (resp: Produit[]) => {
          this.produits = resp;
          this.groupByAttributes();
        }
      );
  }

  groupByAttributes() {
    this.produits.forEach((produit: Produit) => {
      const { category, souscategory, typesproduit } = produit;
      
      // Initialize the nested structure if not already present
      if (!this.produitsGroupedByCategory[category]) {
        this.produitsGroupedByCategory[category] = {};
      }
      if (!this.produitsGroupedByCategory[category]![souscategory]) {
        this.produitsGroupedByCategory[category]![souscategory] = {};
      }
      if (!this.produitsGroupedByCategory[category]![souscategory]![typesproduit]) {
        this.produitsGroupedByCategory[category]![souscategory]![typesproduit] = [];
      }
      
      // Add the product to the correct group
      this.produitsGroupedByCategory[category]![souscategory]![typesproduit]!.push(produit);
    });
  }
}
