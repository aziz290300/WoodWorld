import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFrontComponent } from './frontOffice/home-front/home-front.component';
import { ContactsComponent } from './frontOffice/contacts/contacts.component';
import { HomeBackComponent } from './backOffice/home-back/home-back.component';
import { AllbackComponent } from './backOffice/allback/allback.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddproduitComponent } from './components/produit/addproduit/addproduit.component';
import { ProduitComponent } from './components/produit/produit.component';

const routes: Routes = [
  
  {path:'WoodWorld',component:HomeFrontComponent},
  {path:'', redirectTo :'/WoodWorld', pathMatch:'full'},
  {path:'addproduits',component:AddproduitComponent},
  {path:'produits',component:ProduitComponent},

  {path:'contacts',component:ContactsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},





  {
    path: 'admin',
    component: AllbackComponent,
    children: [
      {
        path: '',
        component: HomeBackComponent
      },
      
  
    ]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
