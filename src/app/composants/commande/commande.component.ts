import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredient';
import { Sandwich } from 'src/app/core/models/sandwich';
import { IngredientService } from 'src/app/core/services/ingrédient.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  public ingredients: Ingredient[] = [];
  public sandwich:Sandwich = {ingredients: []};

  constructor(private ingredientService:IngredientService, private http: HttpClient) { }

  ngOnInit(): void {
    this.sandwich.ingredients = [];
    // this.sandwich.ingredients.push({id:32,libelle: "hhh",imgUrl:"http://127.0.0.1:8000/ingredients/sauce-2.png"})
    // console.log(this.ingredients)

    // this.ingredientService.getAllCategories().subscribe((data) => this.ingredients = data);
    // console.log(this.ingredients);
    this.http.get<any>('http://localhost:8000/api/ingredients').subscribe((data) => {
      // data['hydra:member'].forEach((element: any) => {
      //   console.log(element);
      // });
      this.ingredients = data['hydra:member'];
      console.log(this.ingredients);
      });
  }

  drop(event: CdkDragDrop<Ingredient[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    // alert(event.previousContainer.data);
    // transferArrayItem(event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex);
      console.log(event.previousContainer.data)
      this.sandwich.ingredients.push(event.previousContainer.data[event.previousIndex]);
      // console.log(event.container.data)
    // console.log(event.container.element.nativeElement.getAttribute('sandwich'));
    // this.sandwich.ingredients.push({id:32,libelle: "hhh",imgUrl:"http://127.0.0.1:8000/ingredients/sauce-3.png"})

  }

  filterItemsOfType(type: string){
    return this.ingredients.filter(x => x.libelle == type);
}

}
