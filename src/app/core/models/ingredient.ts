import {CategorieIngredient} from './../models/Categorie-ingredient';
export interface Ingredient {
  id?: number;
  categorie:string,
  libelle?:string;
  imgUrl?:string;
  prix:number;

}
