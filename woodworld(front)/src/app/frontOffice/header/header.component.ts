<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../Service/carte.service';
import { CartItem } from 'src/app/models/produit';  // Assurez-vous que CartItem est correctement importé
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
>>>>>>> aziz

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
<<<<<<< HEAD
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // S'abonner au flux des articles du panier
    this.cartService.getCart().subscribe((cartItems: CartItem[]) => {
      this.cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);  // Calcul du nombre total d'articles
    });
  }
=======
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
>>>>>>> aziz

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
<<<<<<< HEAD
=======
    
>>>>>>> aziz
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
