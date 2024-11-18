// models/TypeReclamation.ts
export enum typeReclamation {
    PRODUIT = 'PRODUIT',
    PAIEMENT = 'PAIEMENT',
    RETOUR_REMBOURSEMENT = 'RETOUR_REMBOURSEMENT',
    SERVICE_CLIENT = 'SERVICE_CLIENT'
  }
  
  // models/Reclamation.ts
  import { TypeReclamation } from './TypeReclamation';
  import { Reponse } from './Reponse';
  
  export class Reclamation {
    idreclamation!: number;
    datereclamation!: Date;
    description!: string;
    typeReclamation!: TypeReclamation;
    importance!: number;
    reponse!: Reponse[];
  }
  