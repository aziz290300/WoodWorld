import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { TypeReclamation } from '../../../models/TypeReclamation';
@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent {
  reclamation: Reclamation = new Reclamation();
  types = Object.values(TypeReclamation); // Récupérer les valeurs de l'énumération
  currentDate: string = new Date().toISOString().split('T')[0];
  constructor(private reclamationService: ReclamationService,private router: Router ) {}

  onSubmit(): void {
    this.reclamation.datereclamation = new Date();
    this.reclamationService.addReclamation(this.reclamation).subscribe({
      next: (response) => {
        alert('Réclamation ajoutée avec succès!');
        this.router.navigate(['/dashboard-reclamation']);
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }
}
