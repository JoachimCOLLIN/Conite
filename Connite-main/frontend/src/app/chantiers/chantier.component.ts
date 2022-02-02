import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import {ChantiersApiService} from './chantiers-api.service';
import { Chantier } from './chantier.model';
import { AuthApiService } from '../auth/auth-api.service';


@Component({
    selector: 'chantier',
    template: `
    <div class ="mon_chantier">Mon Chantier: {{chantier.title}}</div>
    <div>
        <section>                                       
            <button mat-raised-button color="B1" class ="big_button" [routerLink] = "['/listedesouvriers',chantier.id]">Liste des ouvriers</button> 
            <button mat-raised-button color="B2" class ="big_button" [routerLink] = "['/pointage',chantier.id]">Pointage</button>
            <button mat-raised-button color="B3" class ="big_button">Fiches de paie</button> 
            <button mat-raised-button color="B4" class ="big_button">Statistiques</button> 
        </section> 
    </div>
`,
    styles: [`
    button.big_button{
        width: 20vw;
        height: 20vh;
        font-size: 3vh;
        margin: 4vh;

      }
    div.mon_chantier{
        font-size: 3vh;
        margin : 3vh;
        font-weight : bold;
    }
    .mat-B1 {
        background-color: green;
        color: #fff;
    }
    .mat-B2 {
        background-color: red;
        color: #fff;
    }
    .mat-B3 {
        background-color: blue;
        color: #fff;
    }
    .mat-B4 {
        background-color: brown;
        color: #fff;
    }
  
  

`]
})


export class ChantierComponent implements OnInit {

    id : number
    chantiersListSubs: Subscription;
    chantier : Chantier;
    


    constructor(
      private route: ActivatedRoute,
      private chantiersApi: ChantiersApiService,
      private authApi: AuthApiService,
      ) {
        
        
        this.chantier = new Chantier("","","","","");
        this.id = 0;
        
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = +this.route.snapshot.paramMap.get('id')});

    

      this.chantiersListSubs = this.chantiersApi
          .getChantier(this.id)
          .subscribe(res => {this.chantier = res;}, console.error);
    
        console.log(localStorage.getItem('email'));

      const self = this; 

    

      };
    }

        


