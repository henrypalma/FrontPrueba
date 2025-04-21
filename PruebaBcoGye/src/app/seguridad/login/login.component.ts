import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



import { AuthService } from '../../core/services/auth.service';
import { GeneralService } from '../../core/shared/general.service';


import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,


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

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';

    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(2) ]],
    });

  }




  login() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.loading = true;
    this.authService.login(username, password )
      .subscribe({
        next: () =>  {
          this.router.navigate([this.returnUrl])
        },
        error: (ex) => {

          Swal.fire({
            title: '¡Error!',
            text: ex,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          //this.generalService.mensajeError(ex ?? 'servicio inactivo')
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })


  }
}
