import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategorieIngredient } from '../models/Categorie-ingredient';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  endPoint: string = environment.endPointapi
  host: string = environment.host

  constructor(private http: HttpClient) { }

  serialiseTabIngredient(ingredients:Ingredient[]):string[]{
    return ingredients.map(ing=>`${this.endPoint}/ingredients/${ing.id}`)
  }
// utiliser pour la page description Sandwich
  deserialiseTabIngredient(ingredients:string[]):Ingredient[]{
    let result:Ingredient[]=[];
    ingredients.forEach(url => {
      result.push(this.getIngredientByUrl(url))
    });
    // ingredients.map(ing=>`${this.endPoint}/ingredients/${ing.id}`)
    return result;
  }

  getIngredientByUrl(url:string):Ingredient{
    let ing:Ingredient={prix:0,categorie:""};
    this.http.get<Ingredient>(`${this.host}${url}`).subscribe((data)=>ing = data);
    return ing;
  }

  getCategorieIngredientByUrl(url:string):CategorieIngredient{
    let categorie:CategorieIngredient={libelle:""};
    this.http.get<CategorieIngredient>(`${this.host}${url}`).subscribe((data)=>categorie = {id:data.id,libelle:data.libelle});
    // setTimeout(() => {
    //   console.error(categorie)
    // }, 5000);
    return categorie;
  }

  getAllIngredients():Observable<any>{
    return this.http.get<any>(`${this.host}${this.endPoint}/ingredients`);
  }
}
