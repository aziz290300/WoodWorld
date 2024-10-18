// produit.ts

export enum WoodTypes {
  TYPE1 = 'TYPE1',
  TYPE2 = 'TYPE2',
  // Ajoute d'autres types de bois si nécessaire
}

export enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum Stock {
  INSTOCK = 'INSTOCK',
  OUTOFSTOCK = 'OUTOFSTOCK',
}

export enum TypesProduit {
  GALLERY = 'GALLERY',
  // Ajoute d'autres types de produits si nécessaire
}

export enum SousCategory {
  HOME = 'HOME',
  OFFICE = 'OFFICE',
  // Ajoute d'autres sous-catégories si nécessaire
}

export enum Home {
  LIVING = 'LIVING',
  BEDROOM = 'BEDROOM',
  // Ajoute d'autres catégories de maison si nécessaire
}

export enum Category {
  GALLERY = 'GALLERY',
  FURNITURE = 'FURNITURE',
  // Ajoute d'autres catégories si nécessaire
}

export interface Produit {
  id: number; // Correspond à Long id
  name: string; // Correspond à String name
  price: number; // Correspond à long price
  woodtypes: WoodTypes; // Enum pour les types de bois
  size: Size; // Enum pour les tailles
  stock: Stock; // Enum pour le stock
  typesproduit: TypesProduit; // Enum pour les types de produits
  souscategory: SousCategory; // Enum pour les sous-catégories
  home: Home; // Enum pour les catégories de maison
  category: Category; // Enum pour les catégories
  commandes?: Commande[]; // Liste des commandes, optionnelle si le produit n'est pas toujours associé à des commandes
  pictureUrl?: string;
}

// Définition de l'interface Commande si nécessaire
export interface Commande {
  id: number; // Par exemple, id de la commande
  // Ajoute d'autres propriétés de la commande ici
}

// produit.ts
export interface CartItem {
  produit: Produit;  // Produit associé
  quantity: number;  // Quantité
}

