import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sandwich } from '../models/sandwich';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root'
})
export class SandwichService {

  host:string=environment.host
  endPoint:string=environment.endPointapi
  // Sandwich


  constructor(private http: HttpClient,private ingredientService:IngredientService) { }

  saveSandwich(sandwich:Sandwich):Observable<any>{
    const sandwichJson:any=sandwich;
    // sandwichJson.ingredients=this.ingredientService.serialiseTabIngredient(sandwich.ingredients);

    sandwichJson.ingredients = this.ingredientService.serialiseTabIngredient(sandwich.ingredients);
    // sandwich.ingredients= this.ingredientService.serialiseTabIngredient(sandwich.ingredients);
    console.error(this.ingredientService.serialiseTabIngredient(sandwich.ingredients))
    return this.http.post<any>(`${this.host}${this.endPoint}/sandwiches`,sandwich);
}
getAllSandwichies():Observable<any>{
  return this.http.get<any[]>(`${this.host}${this.endPoint}/sandwiches`);
}

getSandwichById(id:number):Observable<any>{
  return this.http.get<any[]>(`${this.host}${this.endPoint}/sandwiches/${id}`);
}
// transform(obsSandwich:Observable<any>):Sandwich{
//   obsSandwich.subscribe(function (params) {
//   })
//   return
// }



}
