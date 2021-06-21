import { Component, OnInit } from '@angular/core';
import { Sandwich } from 'src/app/core/models/sandwich';
import { SandwichService } from 'src/app/core/services/sandwich.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public sandwiches: Sandwich[] = [];
  constructor(private sandwichService:SandwichService) { }

  ngOnInit(): void {
    this.sandwichService.getAllSandwichies().subscribe((data) => {
      this.sandwiches = data['hydra:member'];
      // this.sandwiches = this.transforme(data['hydra:member']);
      console.log(this.sandwiches);

    })
  }


  transforme(tab:any[]):Sandwich[]{
    let sandwiches: Sandwich[]= []
    tab.map(item => {
      sandwiches.push({id:item.id,libelle:item.libelle,imgUrl:item.imgUrl,categorie:item.categorie,description:item.description,ingredients:[],prix:item.prix})
    })
    // console.log(sandwiches)
    return sandwiches;
  }

}
