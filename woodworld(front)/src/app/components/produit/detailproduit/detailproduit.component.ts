import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/models/Produit';
import { ProduitserviceService } from 'src/app/services/produitservice.service';
import { ProcessingImageServiceService } from 'src/app/services/processing-image-service.service';

@Component({
  selector: 'app-detailproduit',
  templateUrl: './detailproduit.component.html',
  styleUrls: ['./detailproduit.component.css']
})
export class DetailproduitComponent implements OnInit {
  produit: Produit | undefined; // Produit sélectionné

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitserviceService,
    private processingImageService: ProcessingImageServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID du produit à partir de l'URL
    if (id) {
      this.produitService.getProduit(+id).subscribe(
        (data: Produit) => {
          this.produit = this.processingImageService.createImage(data); // Process the product images
        },
        error => {
          console.error('Erreur lors de la récupération du produit :', error);
        }
      );
    }
  }
}
