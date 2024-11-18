import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/models/Reclamation';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  reclamations: Reclamation[] = [];
  errorMessage: string = '';

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations(): void {
    this.reclamationService.findAllReclamation().subscribe(
      (data) => {
        console.log('Réclamations récupérées:', data); // Ajout pour débogage
        this.reclamations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des réclamations:', error);
        this.errorMessage = 'Impossible de charger les réclamations pour le moment.';
      }
    );
    
  }

  respondToReclamation(id: number): void {
    console.log('Redirection avec ID:', id); // Ajout pour débogage
    if (!id) {
      console.error('ID de réclamation invalide:', id);
      return;
    }
    this.router.navigate(['/admin/reponse-form', id]).catch((error) => {
      console.error('Erreur lors de la redirection:', error);
    });
  }
  
}
