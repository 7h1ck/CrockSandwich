import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './composants/home-page/home-page.component';
import { TopPageComponent } from './composants/top-page/top-page.component';
import { CommandeComponent } from './composants/commande/commande.component';
import { MenuComponent } from './composants/menu/menu.component';
import { FormCommandeComponent } from './composants/commande/form-commande/form-commande.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescriptionComponent } from './composants/description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopPageComponent,
    CommandeComponent,
    MenuComponent,
    FormCommandeComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
