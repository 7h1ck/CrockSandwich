import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  host:string=environment.host
  constructor(private http:HttpClient) { }

  getAllCategories():Observable<Ingredient[]>{
     return this.http.get<Ingredient[]>('http://localhost:8000/api/ingredients')
    // return of([
    //   {
    //     id:1,
    //     libelle:"Lait",
    //     imgUrl:"34"
    //   },
    //   {
    //     id:1,
    //     libelle:"Lait",
    //     imgUrl:"34"
    //   },
    //   {
    //     id:1,
    //     libelle:"Lait",
    //     imgUrl:"34"
    //   },
    // ])
  }
}
