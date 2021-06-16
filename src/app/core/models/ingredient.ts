import {CategorieIngredient} from './../models/Categorie-ingredient';
export interface Ingredient {
  id: number;
  categorie?:CategorieIngredient
  libelle:string;
  imgUrl:string;

}
