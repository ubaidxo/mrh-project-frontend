import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../_service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor() {}
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  userlogin: boolean = true;
  userregister: boolean = false;
  submitted: boolean = false;
  returnUrl!: string;

  loginForm: FormGroup = this.formBuilder.group({
      userName: [''],
      password: [''],
  });
  registerForm : FormGroup = this.formBuilder.group({
    userName: [''],
    email: [''],
    password: [''],
  })
  
  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  public user_login(): void {
    this.userlogin = false;
    this.userregister = true;
  }

  public user_register(): void {
    this.userregister = true;
    this.userlogin = false;
  }

  public onUserLogin(): void {
   const userInfo = {
      userName : this.loginForm.value.userName,
      password : this.loginForm.value.password,
    }
    this.apiService.loginUser(userInfo).subscribe({
       next : (res : any)=>{
        if(res){
          localStorage.setItem('key_Token', res?.jwt_Token);
          console.log(res);
          this.router.navigate(['/home']);
        } else{
          this.router.navigate(['/login'])
        }
       }, error : (err : HttpErrorResponse)=>{
        console.log(err);
       }
    })    
  }

  public onUserRegister() : void {
    const registerUserInfo = {
      userName : this.registerForm.value.userName,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password,
    }

    this.apiService.registerUser(registerUserInfo).subscribe({
      next : (res: any)=>{
        if(res){
          this.router.navigate(['/home']);
        } else{
          this.router.navigate(['/login']);
        }
      }, error : (err: HttpErrorResponse)=>{
        console.log(err);
      }
    })
  }
}
