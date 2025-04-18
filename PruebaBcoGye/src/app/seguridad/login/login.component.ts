import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '../../core/services/auth.service';
import { GeneralService } from '../../core/shared/general.service';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      ButtonModule,
      InputTextModule,
      DropdownModule,
      PasswordModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {


  private formBuilder     = inject( FormBuilder );
  private authService     = inject( AuthService );
  private router          = inject( Router );
  private activatedRoute  = inject( ActivatedRoute );
  private generalService = inject(GeneralService);


  returnUrl!: string;
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  hide = true;


  ngOnInit(): void {
    console.log("hola mundo")
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';

    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(5) ]],
      idEmpresa: ['', [ Validators.required ]],

    });

  }

  login() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, idEmpresa } = this.loginForm.value;
    this.loading = true;
    this.authService.login(username, password, idEmpresa)
      .subscribe({
        next: () =>  {
          this.router.navigate([this.returnUrl])
        },
        error: (ex) => {
          this.generalService.mensajeWarning(ex.mensaje ?? 'servicio inactivo')
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })


  }
}
