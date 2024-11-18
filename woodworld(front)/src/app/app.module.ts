import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFrontComponent } from './frontOffice/home-front/home-front.component';
import { ContactsComponent } from './frontOffice/contacts/contacts.component';
import { HomeBackComponent } from './backOffice/home-back/home-back.component';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { NavbarComponent } from './backOffice/navbar/navbar.component';
import { AllbackComponent } from './backOffice/allback/allback.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './frontOffice/header/header.component';

import { CartComponent } from './frontOffice/cart/cart.component';
import { FooterComponent } from './frontOffice/footer/footer.component';

import { AddproduitComponent } from './components/produit/addproduit/addproduit.component';
import { ProduitComponent } from './components/produit/dashboardproduit/produit.component';
import { UpdateproduitComponent } from './components/updateproduit/updateproduit.component';
import { AdminproduitComponent } from './components/produit/adminproduit/adminproduit.component';
import { DetailproduitComponent } from './components/produit/detailproduit/detailproduit.component';

import { AddReclamationComponent } from './components/reclamation/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './components/reclamation/update-reclamation/update-reclamation.component';
import { DashboardReclamationComponent } from './components/reclamation/dashboard-reclamation/dashboard-reclamation.component';
import { ReponseComponent } from './components/reponse/reponse.component';
import { ReponseFormComponent } from './components/reponse/reponse-form/reponse-form.component';
import { AnswerlistComponent } from './components/reponse/answerlist/answerlist.component';
import { ViewReponseComponent } from './components/reclamation/view-reponse/view-reponse.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeFrontComponent,
    ContactsComponent,
    HomeBackComponent,
    HeaderBackComponent,
    NavbarComponent,
    AllbackComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,

    CartComponent,
    FooterComponent,

    AddproduitComponent,
  ProduitComponent,
  UpdateproduitComponent,
  AdminproduitComponent,
  DetailproduitComponent,

  AddReclamationComponent,
  UpdateReclamationComponent,
  DashboardReclamationComponent,
  ReponseComponent,
  ReponseFormComponent,
  AnswerlistComponent,
  ViewReponseComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
