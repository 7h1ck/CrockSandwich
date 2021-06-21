import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieIngredient } from 'src/app/core/models/Categorie-ingredient';
import { Ingredient } from 'src/app/core/models/ingredient';
import { Sandwich } from 'src/app/core/models/sandwich';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { SandwichService } from 'src/app/core/services/sandwich.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  public ingredients: Ingredient[] = [];
  public ingredientSandwich: Ingredient[] = [];
  public sandwich:Sandwich = {ingredients: [],categorie:"hamburger",prix:200};
  public sandwichFormGroupe!:FormGroup;
  submitted:boolean=false;
  // categ:CategorieIngredient = {libelle:""};

  constructor(private ingredientService:IngredientService,private sandwichService:SandwichService,
    private router:Router, private http: HttpClient,private fb:FormBuilder) { }

  ngOnInit(): void {
    // this.http.get<CategorieIngredient>("http://127.0.0.1:8000/api/categorie_ingredients/3").subscribe((data)=> this.categ = {id:data.id,libelle:data.libelle});

    // let test: CategorieIngredient= this.ingredientService.getCategorieIngredientByUrl("/api/categorie_ingredients/3")
    // setTimeout(() => {
      //   console.warn(test)
      // }, 5000);

      // this.categIng.getCategorieFromUrl("/api/ingredients/2")
      // this.sandwich.ingredients = [];
      // this.sandwich.ingredients.push({id:32,libelle: "hhh",imgUrl:"http://127.0.0.1:8000/ingredients/sauce-2.png"})
      // console.log(this.ingredients)

      // this.ingredientService.getAllCategories().subscribe((data) => this.ingredients = data);
      // console.log(this.ingredients);
      this.ingredientService.getAllIngredients().subscribe((data) => {
        // data['hydra:member'].forEach((element: any) => {
          //   console.log(element);
          // });
          this.ingredients = this.transforme(data['hydra:member']);

          // setTimeout(() =>console.log(this.categ),5000)
          console.log(this.ingredients)

          // console.log(data['hydra:member']);
        });

        this.sandwichFormGroupe=this.fb.group({
          libelle:["",[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
          description:["",[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
        })
        //  console.warn(test)
        // console.log(this.categ)
      }

      drop(event: CdkDragDrop<Ingredient[]>) {
        // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    // alert(event.previousContainer.data);
    // transferArrayItem(event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex);
    // console.log(event.previousContainer.data)
    let ing: Ingredient=event.previousContainer.data[event.previousIndex];
    this.ingredientSandwich.push(ing);
    // console.log(ing)
      this.sandwich.prix += ing.prix;
      // console.log(event.container.data)
    // console.log(event.container.element.nativeElement.getAttribute('sandwich'));
    // this.sandwich.ingredients.push({id:32,libelle: "hhh",imgUrl:"http://127.0.0.1:8000/ingredients/sauce-3.png"})

  }

  filterItemsOfType(categorie: string){
    // let cat: Ingredient
    // console.log(this.ingredients)
    return this.ingredients.filter(x => x.categorie == categorie);
}

  transforme(tab:any[]):Ingredient[]{
    let ingredients: Ingredient[]= []
    tab.map(item => {
      // let categorie:CategorieIngredient={libelle:""}
      // this.http.get<CategorieIngredient>(`http://127.0.0.1:8000${item.categorie}`).subscribe((data)=> categorie = {id:data.id,libelle:data.libelle});
      ingredients.push({id:item.id,libelle:item.libelle,imgUrl:item.imgUrl,categorie:item.categorie,prix:item.prix})
      // setTimeout(() =>console.log(categorie),5000)
    })
    // console.log(ingredients)
    return ingredients;
  }

  // getCategorieFromUrl(urlCategories: string):CategorieIngredient{
  //   var categorie:CategorieIngredient|null;
  //   this.http.get<any>(`http://localhost:8000${urlCategories}`).subscribe((data)=>{
  //     categorie =  {id:data.id,libelle:data.libelle};
  //     // console.log(categorie);
  //   })
  //   console.log(categorie);

  //   return categorie;
  // }

  // transformeCateg(categorieIngredient:CategorieIngredient):CategorieIngredient{
  //   return {id:categorieIngredient.id, libelle:categorieIngredient.libelle}
  // }

  afficheFor(): void{

  }
  get controls(){
    return this.sandwichFormGroupe.controls;
}

onSave(){
  this.submitted=true;
  if(this.sandwichFormGroupe.invalid) return
  this.sandwich.libelle = this.sandwichFormGroupe.value.libelle;
  this.sandwich.description = this.sandwichFormGroupe.value.description;
  // this.sandwich.prix = 2000;
  this.sandwich.ingredients = this.ingredientSandwich;
  this.sandwich.imgUrl = "http://127.0.0.1:8000/burger-il.jpg";
  console.log(this.sandwich)
    // const prod:Produit=this.produitFormGroupe.value
    this.sandwichService.saveSandwich(this.sandwich).subscribe(
      (data)=>{
        this.router.navigateByUrl("/menu")
      }
    )
 }

}
