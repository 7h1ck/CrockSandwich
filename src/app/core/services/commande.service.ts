import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  host: string = environment.host
  endPoint: string = environment.endPointapi;
  constructor(private http: HttpClient) { }

  saveCommande(commande:Commande):Observable<Commande> {
    return this.http.post<Commande>(`${this.host}${this.endPoint}/commandes`,commande)
  }
}
