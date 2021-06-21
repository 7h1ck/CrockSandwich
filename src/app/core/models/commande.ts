import { Time } from "@angular/common";
import { Sandwich } from "./sandwich";

export interface Commande{
  id?: number;
  fullName?: string;
  email?: string;
  telephone?: string;
  date:Date;
  heure:Time
  quantity:number;
  adresse:string;
  sandwich:Sandwich|string
}
