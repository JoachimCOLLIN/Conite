import {Component} from '@angular/core';
import {AuthApiService} from './auth-api.service';
import {Router} from "@angular/router";
import { User } from './auth.model';



@Component({
    selector: 'login-form',
    template: `
<mat-card>
<h2>Connexion</h2>
<mat-form-field class="full-width">
<input matInput
placeholder="Adresse Email"
(keyup)="updateEmail($event)">
</mat-form-field>

<mat-form-field class="full-width">
<input type="password" matInput
placeholder="Mot de passe"
(keyup)="updatePassword($event)">
</mat-form-field>

<button mat-raised-button
color="primary"
(click)="login()">
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
    id:0;
    constructor(private authApi: AuthApiService, private router: Router)
    {}
    updateEmail(event: any)
    {
        this.authApi.user.email = event.target.value;
    }
    updatePassword(event: any)
    {
        this.authApi.user.password = event.target.value;
    }
    
    login()
    {
        this.authApi
            .login(this.authApi.user)
            .subscribe(
                res => {this.id= res;},
                
                () => this.router.navigate(['/']),
            );
        console.log(this.id)

    }
}
