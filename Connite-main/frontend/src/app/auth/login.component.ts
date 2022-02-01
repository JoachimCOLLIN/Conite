import {Component} from '@angular/core';
import {AuthApiService} from './auth-api.service';
<<<<<<< Updated upstream
import {Router} from "@angular/router";
=======
import {Router,NavigationExtras} from "@angular/router";
import { User } from './auth.model';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

>>>>>>> Stashed changes


@Component({
    selector: 'login-form',
    template: `
<mat-card>
<h2>Connexion</h2>
<mat-form-field class="full-width">
<input matInput
placeholder="Adresse Email">
</mat-form-field>

<mat-form-field class="full-width">
<input type="password" matInput
placeholder="Mot de passe">
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
<<<<<<< Updated upstream
    authentication = {
        login: '',
        password: ''
    };

=======
    test : User;
    email: string;
    password: string;
    id:0;
    res1:User;
>>>>>>> Stashed changes
    constructor(private authApi: AuthApiService, private router: Router)
    {}

    updateLogin(event: any)
    {
        this.authentication.login = event.target.value;
    }

    updatePassword(event: any)
    {
        this.authentication.password = event.target.value;
    }

    login()
    {
        this.authApi
            .login(this.authentication)
            .subscribe(
<<<<<<< Updated upstream
                () => this.router.navigate(['/']),
                error => alert(error.message)
=======
                res =>{this.authApi.user = res;
                this.router.navigate(["/chantier"]);
                localStorage.setItem('email', res.email);},
                err => console.log(err),



>>>>>>> Stashed changes
            );

        sessionStorage.setItem('login', this.authentication.login);
    }
}
