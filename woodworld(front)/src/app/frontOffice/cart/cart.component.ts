import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/produit';
import { CartService } from '../Service/carte.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(item: CartItem, newQuantity: number) {
    item.quantity = newQuantity;  // Met à jour la quantité
    this.cartService.updateCart(); // Mets à jour le panier
  }

  // Supprimer un produit du panier
  removeFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId);
  }

  // Calculer le total du panier
  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  // Passer à la commande (Checkout)
  checkout() {
    alert('Fonctionnalité de commande à implémenter.');
  }
   // Vider le panier
   clearCart() {
    this.cartService.clearCart(); // Appel au service pour vider le panier
  }
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }
}
