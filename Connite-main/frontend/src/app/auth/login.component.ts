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
    user= new User('','' ,[''],false);
    constructor(private authApi: AuthApiService, private router: Router)
    {}

    login()
    {
        this.authApi
            .login(this.user)
            .subscribe(
                () => this.router.navigate(['/']),
                error => alert(error.message)
            );

        sessionStorage.setItem('email', this.user.email);
    }
}
