import { Component } from '@angular/core';
import { ReponseService } from 'src/app/services/reponse.service';
import { Reponse } from 'src/app/models/Reponse';
@Component({
  selector: 'app-answerlist',
  templateUrl: './answerlist.component.html',
  styleUrls: ['./answerlist.component.css']
})
export class AnswerlistComponent {
  reponses: Reponse[] = [];
  errorMessage: string = '';

  constructor(private reponseService: ReponseService) {}

  ngOnInit(): void {
    this.getReponses();
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


