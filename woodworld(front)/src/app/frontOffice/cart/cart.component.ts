import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, Produit } from 'src/app/models/Produit';
import { CartService } from '../Service/carte.service';
import { ProduitserviceService } from 'src/app/services/produitservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = []; // Liste des éléments du panier
  produit!: Produit; // Produit récupéré depuis l'ID
  errorMessage: string = ''; // Message d'erreur

  constructor(
    private cartService: CartService,
    private produitService: ProduitserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Charger les données du panier
    this.loadCart();

    // Récupérer l'ID du produit dans le chemin
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProduitById(parseInt(id, 10));
      }
    });
  }

  // Charger un produit spécifique
  loadProduitById(id: number): void {
    this.produitService.getProduit(id).subscribe(
      (produit) => {
        this.produit = produit;
      },
      (error) => {
        console.error('Erreur lors du chargement du produit :', error);
        this.errorMessage = 'Impossible de charger les informations du produit.';
        alert(this.errorMessage); // Afficher un message d'alerte
      }
    );
  }

  // Charger les données du panier
  loadCart(): void {
    this.cartService.getCart().subscribe(
      (cart) => {
        this.cart = cart;
      },
      (error) => {
        console.error('Erreur lors du chargement du panier :', error);
        this.errorMessage = 'Erreur lors de la récupération des données du panier.';
      }
    );
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      this.cartService.updateCart(); // Mettre à jour le panier
    }
  }

  // Supprimer un produit du panier
  removeFromCart(productId: number): void {
    this.cartService.removeProductFromCart(productId);
    this.loadCart(); // Recharger le panier après suppression
  }

  // Obtenir le prix total
  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  // Fonctionnalité de commande
  checkout(): void {
    alert('Fonctionnalité de commande à implémenter.');
  }

  // Vider le panier
  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart(); // Recharger le panier après vidage
  }

  // Réduire la quantité
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(); // Mettre à jour après modification
    }
  }

  // Augmenter la quantité
  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.cartService.updateCart(); // Mettre à jour après modification
  }
}
