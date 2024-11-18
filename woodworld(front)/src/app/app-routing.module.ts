import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFrontComponent } from './frontOffice/home-front/home-front.component';
import { ContactsComponent } from './frontOffice/contacts/contacts.component';
import { HomeBackComponent } from './backOffice/home-back/home-back.component';
import { AllbackComponent } from './backOffice/allback/allback.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddproduitComponent } from './components/produit/addproduit/addproduit.component';
import { ProduitComponent } from './components/produit/dashboardproduit/produit.component';
import { UpdateproduitComponent } from './components/updateproduit/updateproduit.component';
import { AdminproduitComponent } from './components/produit/adminproduit/adminproduit.component';
import { DetailproduitComponent } from './components/produit/detailproduit/detailproduit.component';


import { CartComponent } from './frontOffice/cart/cart.component';
import { AddReclamationComponent } from './components/reclamation/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './components/reclamation/update-reclamation/update-reclamation.component';
import { DashboardReclamationComponent } from './components/reclamation/dashboard-reclamation/dashboard-reclamation.component';
import { ReponseComponent } from './components/reponse/reponse.component';
import { ReponseFormComponent } from './components/reponse/reponse-form/reponse-form.component';
import { AnswerlistComponent } from './components/reponse/answerlist/answerlist.component';
import { ViewReponseComponent } from './components/reclamation/view-reponse/view-reponse.component';


const routes: Routes = [
  
  {path:'WoodWorld',component:HomeFrontComponent},
  {path:'', redirectTo :'/WoodWorld', pathMatch:'full'},

  { path: 'add-reclamation', component: AddReclamationComponent },
  { path: 'update-reclamation/:id', component: UpdateReclamationComponent }, // Récupère l'ID pour l'update
  { path: 'dashboard-reclamation', component: DashboardReclamationComponent }, // Route pour le dashboard
  { path: 'view-reponse/:id', component: ViewReponseComponent },  // Route pour voir la réponse
  {path:'produits',component:ProduitComponent},
  { path: 'produit-detail/:id', component: DetailproduitComponent }, 
  {path:'contacts',component:ContactsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartComponent},
  { path: 'cart/:id', component: CartComponent },






  {
    path: 'admin',
    component: AllbackComponent,
    children: [
      {
        path: '',
        component: HomeBackComponent
      },
      { path: 'answerlist', component: AnswerlistComponent },
      { path: 'reponse-form/:id', component: ReponseFormComponent },
      { path: 'reponse', component: ReponseComponent },
      {path:'addproduits',component:AddproduitComponent},
      { path: 'upproduits/:id', component: UpdateproduitComponent },
      {path:'produits',component:AdminproduitComponent},

    ]},


      
    

    ];

  



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
