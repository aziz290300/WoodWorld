import { Component } from '@angular/core';
import { ReponseService } from 'src/app/services/reponse.service';
import { Reponse } from 'src/app/models/Reponse';
import { Reclamation } from 'src/app/models/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-reponse',
  templateUrl: './view-reponse.component.html',
  styleUrls: ['./view-reponse.component.css']
})
export class ViewReponseComponent {

  reponses: Reponse[] = [];
  errorMessage: string = '';
  selectedReponse: Reponse | null = null;

  Reclamation: Reclamation[] = [];
  reclamationId: number | undefined;
  constructor(private reponseService: ReponseService,    private reclamationService: ReclamationService,private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadReponses();
    this.loadReclamations();
    // Récupération de l'ID de réclamation depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
          this.reclamationId = parseInt(id, 10); // Assurez-vous que l'ID est bien récupéré sous forme de nombre
        
          // Gérer le cas où l'ID n'est pas trouvé dans les paramètres de l'URL
      }
  });
  }

  loadReponses(): void {
    this.reponseService.findAllReponse()
      .subscribe(
        reponses => {
          // Filtrer les réponses par ID de réclamation sélectionné
          this.reponses = reponses.filter(reponse => reponse.reclamation.idreclamation === this.reclamationId);
  
          // Pour chaque réponse filtrée, générer le QR code correspondant
          this.reponses.forEach(reponse => {
         
          });
        },
        error => console.error('Erreur lors du chargement des réponses :', error)
      );
  }
  
    loadReclamations(): void {
      this.reclamationService.findAllReclamation()
        .subscribe(
           Reclamation => this. Reclamation =  Reclamation,
          error => console.error('error, getAllReclamations', error)
        );
    }

  getReponses(): void {
    this.reponseService.findAllReponse().subscribe(
      (data) => {
        this.reponses = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des réponses:', error);
        this.errorMessage = 'Impossible de charger les réponses.';
      }
    );
  }
}
