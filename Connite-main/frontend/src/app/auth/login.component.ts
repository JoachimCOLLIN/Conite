import {Component} from '@angular/core';
import {AuthApiService} from './auth-api.service';
import {Router,NavigationExtras} from "@angular/router";
import { User } from './auth.model';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';



@Component({
    selector: 'login-form',
    template: `
<mat-card>
<h2>Connexion</h2>
<mat-form-field class="full-width">
<input matInput
placeholder="Adresse Email"
[(ngModel)]="email">
</mat-form-field>

<mat-form-field class="full-width">
<input type="password" matInput
placeholder="Mot de passe"
[(ngModel)] = "password">
</mat-form-field>

<button mat-raised-button
color="primary"
(click)="login(email, password)">
Se connecter
</button>
</mat-card>
`,
    styles: [`
.login-form {
min-width: 150px;
max-width: 500px;
width: 100%;
}

.full-width {
width: 100%;
}
`]
})


export class LoginComponent {
    test : User;
    email: string;
    password: string;
    id:0;
    res1:User;
    constructor(private authApi: AuthApiService, private router: Router)
    {}
    // updateEmail(event: any)
    // {
    //     this.authApi.user.email = event.target.value;
    // }
    // updatePassword(event: any)
    // {
    //     this.authApi.user.password = event.target.value;
    // }

    login(email: string, password: string)
    {   

        this.authApi
            .login(email, password)
            .subscribe(
                res =>{this.authApi.user = res;
                this.router.navigate(["/"])},
                err => console.log(err),



            );
            

   
    }
}
