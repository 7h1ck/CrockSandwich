import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/core/models/commande';
import { Ingredient } from 'src/app/core/models/ingredient';
import { Sandwich } from 'src/app/core/models/sandwich';
import { CommandeService } from 'src/app/core/services/commande.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { SandwichService } from 'src/app/core/services/sandwich.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  id:number=0;
  sandwich:Sandwich={ingredients:[],prix:0};
  ingredients:Ingredient[]= [];
  formCommande!:FormGroup
  commande!:Commande;
  submitted:boolean=false
  constructor(private router:ActivatedRoute,private sandwichService:SandwichService,private http: HttpClient,private fb:FormBuilder,private cmdService:CommandeService,private navigator:Router,public ingredientService:IngredientService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;

    this.sandwichService.getSandwichById(this.id).subscribe(data => {
      this.sandwich = data
      this.ingredients = this.ingredientService.deserialiseTabIngredient(data.ingredients)
      console.log(this.sandwich.ingredients)
    })
    // this.sandwich.ingredients = this.ingredientService.deserialiseTabIngredient(this.sandwich.ingredients)
    // console.log(this.sandwich$);
    // var that=this;
    // this.http.get<any>('http://localhost:8000/api/ingredients/2').subscribe(data => {
    //   this.sandwich = {id:data.id,ingredients:data.ingredients,libelle:data.libelle};
    //   console.log(this.sandwich)
    // });

    // setTimeout(()=>console.log(this.sandwich),5000)
    // console.log(this.sandwich)

    this.formCommande=this.fb.group({
      fullName:["",[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      email:["",[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      telephone:["",[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      date:["",[Validators.required]],
      heure:["",[Validators.required]],
      adresse:["",[Validators.required,Validators.maxLength(50),Validators.minLength(5)]],
      quantite:[0,[Validators.required,Validators.min(1)]],
     })

    //  Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // })
    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener('mouseenter', Swal.stopTimer)
    //     toast.addEventListener('mouseleave', Swal.resumeTimer)
    //   }
    // })

    // Toast.fire({
    //   icon: 'success',
    //   title: 'Signed in successfully'
    // })
  }

  // yade(params:any) Sandwich{
  //   // this.sandwich = {id:params.id,ingredients:params.ingredients};
  //   this.data = params.map(data => {id:data.id,libelle:data.libelle});
  //   // console.log(params);

  //   // this.sandwich.libelle = params.libelle;
  //   // this.sandwich.description = params.description;
  //   this.id = params.id;
  // }

  get controls(){
    return this.formCommande.controls;
}

dialogSucces(): void {
  Swal.fire(
    'Commande enregistrée avec succès',
    'Cliquer sur OK pour retouner vers l\'accueil',
    'success'
  )
}
onValidCmmande(){
   this.submitted=true;
    console.log("validIn")
   if(this.formCommande.invalid) return
    console.log(this.commande)
   this.commande = this.formCommande.value
   this.commande.sandwich = `/api/sandwiches/${this.sandwich["id"]}`
     this.cmdService.saveCommande(this.commande).subscribe(
       (data)=>{
        this.dialogSucces
         this.navigator.navigateByUrl("/")
       }
     )
  }
}
