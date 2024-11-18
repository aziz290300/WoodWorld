import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reponse } from 'src/app/models/Reponse';
import { ReponseService } from 'src/app/services/reponse.service';
import { ReclamationService } from 'src/app/services/reclamation.service';  // Ajout du service de réclamation
import { Reclamation } from 'src/app/models/Reclamation';  // Importation de la classe Reclamation

@Component({
  selector: 'app-reponse-form',
  templateUrl: './reponse-form.component.html',
  styleUrls: ['./reponse-form.component.css']
})
export class ReponseFormComponent implements OnInit {
  reponse: Reponse = new Reponse();
  idReclamation: number = 0;
  errorMessage: string = '';
  reclamation!: Reclamation;  // Déclarer une variable de type Reclamation pour recevoir les détails

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseService: ReponseService,
    private reclamationService: ReclamationService  // Injection du service de réclamation
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idReclamation = +id;
      this.getReclamationDetails(this.idReclamation);  // Récupérer les détails de la réclamation
    } else {
      console.error('Aucun ID de réclamation fourni');
      this.errorMessage = 'Réclamation introuvable.';
    }
  }

  // Fonction pour récupérer les détails de la réclamation
  getReclamationDetails(id: number): void {
    this.reclamationService.getReclamationById(id).subscribe(
      (data) => {
        this.reclamation = data;
        this.reponse.reclamation = this.reclamation;  // Assignation de la réclamation à l'objet réponse
      },
      (error) => {
        console.error('Erreur lors de la récupération de la réclamation:', error);
        this.errorMessage = 'Impossible de récupérer les détails de la réclamation.';
      }
    );
  }

  onSubmit(): void {
    if (!this.reponse.reponsecontent) {
      this.errorMessage = 'Le contenu de la réponse est requis.';
      return;
    }
  
    this.reponse.datereponse = new Date(); // Ajouter la date de la réponse
    this.reponseService.addReponseAndAffect(this.idReclamation, this.reponse).subscribe(
      () => {
        console.log('Réponse envoyée avec succès');
        this.errorMessage = ''; // Effacer les messages d'erreur si l'envoi est réussi
  
        // Afficher un message de succès dans la console
        console.log('Réponse envoyée avec succès pour la réclamation ID:', this.idReclamation);
  
        // Redirection vers la liste des réponses après un ajout réussi
        this.router.navigate(['/admin/answerlist']); // Assurez-vous que la route '/admin/reponse' est bien définie dans votre routing
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réponse:', error);
        this.errorMessage = 'Impossible d\'envoyer la réponse.';
      }
    );
  }
  
}
  
