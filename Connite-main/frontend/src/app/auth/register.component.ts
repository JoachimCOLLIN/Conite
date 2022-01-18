import {Component} from '@angular/core';
import {AuthApiService} from './auth-api.service';
import {Router} from "@angular/router";


@Component({
    selector: 'register-form',
    template: `
<mat-card>
<h2>Inscription</h2>
<mat-form-field class="full-width">
<input matInput
placeholder="Adresse Email"
(keyup)="updateEmail($event)">
</mat-form-field>

<mat-form-field class="full-width">
<input matInput
placeholder="Prénom"
(keyup)="updateFirst_name($event)">
</mat-form-field>

<mat-form-field class="full-width">
<input matInput
placeholder="Nom"
(keyup)="updateFamily_name($event)">
</mat-form-field>

<mat-form-field class="full-width">
<input matInput
placeholder="Mot de passe"
(keyup)="updatePassword1($event)">
</mat-form-field>

<mat-form-field class="full-width">
<input matInput
placeholder="Confirmer Mot de Passe"
(keyup)="updatePassword2($event)">
</mat-form-field>

<button mat-raised-button
color="primary"
(click)="register()">
Inscription
</button>
</mat-card>
`,
    styles: [`
.register-form {
min-width: 150px;
max-width: 500px;
width: 100%;
}

.full-width {
width: 100%;
}
`]
})


export class RegisterComponent {
    

    constructor(private authApi: AuthApiService, private router: Router)
    {}

    updateEmail(event: any)
    {
        this.authApi.auth.email = event.target.value;
    }

    updatePassword1(event: any)
    {
        this.authApi.auth.password1 = event.target.value;
    }
    updatePassword2(event: any)
    {
        this.authApi.auth.password2 = event.target.value;
    }
    updateFirst_name(event: any)
    {
        this.authApi.auth.first_name = event.target.value;
    }
    updateFamily_name(event: any)
    {
        this.authApi.auth.family_name = event.target.value;
    }
   

    register()
    {
        this.authApi
            .register(this.authApi.auth)
            .subscribe(
                () => this.router.navigate(['/login']),
                error => alert(error.message)
            );
    }
}
