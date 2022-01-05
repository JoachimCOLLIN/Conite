import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'information',
    template: `
<h2>Mon Chantier</h2>
<p>{{id}}</p>


`,
    styles: [`

`]
})


export class InformationsComponent implements OnInit {

    id : string;

    constructor(
      private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.id = this.route.snapshot.paramMap.get('id')
      });

      };
    }

        


