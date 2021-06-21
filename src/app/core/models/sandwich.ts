import { CategorieSandwich } from "./categorie-sandwich";
import { Ingredient } from "./ingredient";

export interface Sandwich{
  id?: number,
  categorie?:CategorieSandwich|string,
  libelle?:string,
  description?:string,
  prix:number,
  imgUrl?:string,
  ingredients:Ingredient[]
}
