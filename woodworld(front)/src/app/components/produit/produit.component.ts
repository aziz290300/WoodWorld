import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/Produit';
import { ProcessingImageServiceService } from 'src/app/services/processing-image-service.service';
import { ProduitserviceService } from 'src/app/services/produitservice.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  produits:Produit[]=[]
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

}
