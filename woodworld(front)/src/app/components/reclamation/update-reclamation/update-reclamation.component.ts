import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { TypeReclamation } from '../../../models/TypeReclamation';
@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  reclamation: Reclamation = new Reclamation();
  types = Object.values(TypeReclamation);
  currentDate: string = new Date().toISOString().split('T')[0];
  constructor(
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.reclamationService.getReclamationById(id).subscribe({
      next: (response) => {
        this.reclamation = response;
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  onSubmit(): void {
    this.reclamationService.updateReclamation(this.reclamation).subscribe({
      next: () => {
        alert('Réclamation mise à jour avec succès!');
        this.router.navigate(['/dashboard-reclamation']);
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }
}
