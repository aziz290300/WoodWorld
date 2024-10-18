import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProduitserviceService } from 'src/app/services/produitservice.service';
import { Router } from '@angular/router';
import { Produit, Woodtypes, Size, Stock, Typesproduit, Souscategory, Home, Category } from 'src/app/models/Produit';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.css']
})
export class AddproduitComponent {

  produit: Produit = new Produit(); // Initialiser un nouveau produit
  selectedFiles: File[] = []; // Fichiers sélectionnés

  // Ajouter les options pour les énumérations
  woodtypesOptions = Object.values(Woodtypes);
  sizeOptions = Object.values(Size);
  stockOptions = Object.values(Stock);
  typesProduitOptions = Object.values(Typesproduit);
  souscategoryOptions = Object.values(Souscategory);
  homeOptions = Object.values(Home);
  categoryOptions = Object.values(Category);

  constructor(private produitService: ProduitserviceService, private router: Router) {}

  // Gérer la sélection de fichiers
  onFileSelected(event: any): void {
    const files = event.target.files;
    this.selectedFiles = Array.from(files); // Convertir FileList en tableau
  }

  // Préparer les données du formulaire avec les fichiers
  prepareFormData(produit: Produit): FormData {
    const formData = new FormData();
    
    // Ajouter les informations du produit sous forme de JSON
    formData.append('produit', JSON.stringify(produit));
    
    // Ajouter les fichiers sélectionnés
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    return formData;
  }

  // Ajouter un produit en utilisant le service
  addProduit(): void {
    const formData = this.prepareFormData(this.produit); // Préparer les données
    this.produitService.addProduit(this.produit, this.selectedFiles).subscribe(
      response => {
        console.log('Produit ajouté avec succès :', response);
        this.router.navigate(['admin/produits']);
      },
      error => {
        console.error('Erreur lors de l\'ajout du produit :', error);
      }
    );
  }
  
}
