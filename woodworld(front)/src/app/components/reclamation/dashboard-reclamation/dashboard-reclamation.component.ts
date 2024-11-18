import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-dashboard-reclamation',
  templateUrl: './dashboard-reclamation.component.html',
  styleUrls: ['./dashboard-reclamation.component.css']
})
export class DashboardReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];
  constructor(private reclamationService: ReclamationService, private router: Router) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.findAllReclamation().subscribe({
      next: (response) => {
        this.reclamations = response;
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  onUpdate(id: number): void {
    this.router.navigate(['/update-reclamation', id]);
  }

  onDelete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette réclamation ?')) {
      this.reclamationService.deleteReclamation(id).subscribe({
        next: () => {
          alert('Réclamation supprimée avec succès!');
          this.loadReclamations();
        },
        error: (err) => {
          console.error('Erreur:', err);
        }
      });
      
    }
  }
  onCheckReponse(id: number): void {
    this.router.navigate(['/view-reponse', id]);
  }
}
