import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './composants/commande/commande.component';
import { FormCommandeComponent } from './composants/commande/form-commande/form-commande.component';
import { DescriptionComponent } from './composants/description/description.component';
import { HomePageComponent } from './composants/home-page/home-page.component';
import { MenuComponent } from './composants/menu/menu.component';
import { TopPageComponent } from './composants/top-page/top-page.component';

const routes: Routes = [
  {path:"creer",component:CommandeComponent},
  {path:"menu",component:MenuComponent},
  {path:"apropos",component:HomePageComponent},
  {path:"description/:id",component:DescriptionComponent},
  {path:"save",component:FormCommandeComponent},
  {path:"",redirectTo:"/",pathMatch:'full'},
  // {path:"**",component:PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
