import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit, CartItem } from 'src/app/models/produit';  // Assurez-vous que CartItem est exporté

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartItem[] = [];  // Le panier avec les produits
  private cartSubject = new BehaviorSubject<CartItem[]>([]);  // Pour notifier des changements

  constructor() {
    // Charger les produits du localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartSubject.next(this.cart);
    }
  }

  // Obtenir les produits du panier
  getCart() {
    return this.cartSubject.asObservable();  // Utilisé pour les abonnements dans les composants
  }

  // Ajouter un produit au panier
  addProductToCart(product: Produit, quantity: number) {
    const existingCartItem = this.cart.find(item => item.produit.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;  // Mettre à jour la quantité
    } else {
      this.cart.push({ produit: product, quantity });  // Ajouter le produit avec la quantité
    }

    this.updateCart();
  }

  // Mettre à jour le panier (synchroniser avec localStorage)


   updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);  // Notifier les abonnés des changements
  }

  // Supprimer un produit du panier
  removeProductFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.produit.id !== productId);
    this.updateCart();
  }

  // Vider le panier
  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  // Obtenir le total du prix
  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + (item.produit.price * item.quantity), 0);
  }
}
