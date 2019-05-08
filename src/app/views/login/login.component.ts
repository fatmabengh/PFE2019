import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  credentials: FormGroup;
  isLoginError = false;
  constructor(private UserService: UserService,private router: Router,private fb: FormBuilder, private msg: ToastrService){}
  ngOnInit() {
    this.create();
   }
 
 
  create(){
    this.credentials = this.fb.group({
      'email': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      
  });
  }
  SubmitLogin(){

let email= this.credentials.get('email').value;
let password=this.credentials.get('password').value;
console.log(email ,password);
this.UserService.login(email, password).subscribe((data: any) => {
  console.log(data);
if(data){
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('user_id',data.user_id);
      this.msg.success('user logged successfully');
      this.router.navigate(['/dashboard/dashboard']);
;}
else{
  this.msg.success('failed to login please try again');
}   
  (err: HttpErrorResponse) => {
  console.log(err);
  this.msg.success('failed to login please try again');
    this.isLoginError = true;}
  });
    
   

    }
}

   

  
 
