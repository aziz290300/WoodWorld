import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitserviceService } from 'src/app/services/produitservice.service';
import { FileHandle } from 'src/app/models/FileHandle';
import { Produit, Woodtypes, Size, Stock, Typesproduit, Souscategory, Home, Category } from 'src/app/models/Produit';
import { DomSanitizer } from '@angular/platform-browser';
import { ProcessingImageServiceService } from 'src/app/services/processing-image-service.service';

@Component({
  selector: 'app-updateproduit',
  templateUrl: './updateproduit.component.html',
  styleUrls: ['./updateproduit.component.css']
})
export class UpdateproduitComponent {
  produit: Produit = new Produit(); // Pour stocker les données du produit récupéré
  selectedFiles: File[] = []; // Fichiers sélectionnés pour mise à jour

  // Ajouter les options pour les énumérations
  woodtypesOptions = Object.values(Woodtypes);
  sizeOptions = Object.values(Size);
  stockOptions = Object.values(Stock);
  typesProduitOptions = Object.values(Typesproduit);
  souscategoryOptions = Object.values(Souscategory);
  homeOptions = Object.values(Home);
  categoryOptions = Object.values(Category);

  produitId: number = 0; // Initialisation par défaut

  constructor(
    private produitService: ProduitserviceService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private processingImageService: ProcessingImageServiceService // Injecter le service pour traiter les images
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du produit à partir de la route
    this.produitId = this.route.snapshot.params['id'];

    // Charger les informations du produit
    this.produitService.getProduit(this.produitId).subscribe(
      (data: Produit) => {
        this.produit = this.processingImageService.createImage(data); // Process the product images
      },
      error => {
        console.error('Erreur lors du chargement du produit :', error);
      }
    );
  }

  // Gérer la sélection de fichiers
  onFileSelected(event: any): void {
    const files = event.target.files;
    this.selectedFiles = Array.from(files); // Convertir FileList en tableau
  }

  // Préparer les données du formulaire avec les fichiers pour la mise à jour
  prepareFormData(produit: Produit): FormData {
    const formData = new FormData();
    
    // Ajouter les informations du produit sous forme de JSON
    formData.append('produit', JSON.stringify(produit));
    
    // Ajouter les nouveaux fichiers sélectionnés, s'il y en a
    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    return formData;
  }

  // Mettre à jour le produit en utilisant le service
  updateProduit(): void {
    const formData = this.prepareFormData(this.produit); // Préparer les données
    this.produitService.updateProduit(this.produit, this.selectedFiles).subscribe(
      response => {
        console.log('Produit mis à jour avec succès :', response);
        this.router.navigate(['admin/produits']);
      },
      error => {
        console.error('Erreur lors de la mise à jour du produit :', error);
        alert(`Une erreur est survenue : ${error.error || error.message || "Erreur inconnue"}`);
      }
    );
    
}


  removeImages(i: number): void {
    this.produit.images.splice(i, 1);
  }
  
  fileDropped(fileHandle: any) {
    this.produit.images.push(fileHandle);
  }
}
