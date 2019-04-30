import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  isLoginError = false;
  registration :FormGroup;
  constructor(private UserService: UserService,private fb: FormBuilder,private router: Router,private msg: ToastrService) { }
  ngOnInit() {
    this.create();
  }
  create(){
    this.registration = this.fb.group({
      'nomComplet': new FormControl('',Validators.required),
      'email': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'newpassword': new FormControl('',Validators.required),
  });
  }

  CreateAccount(){
 if(this.registration.valid){
   if(this.registration.get('password').value== this.registration.get('newpassword').value){
     
      console.log('ok');}
    this.UserService.Registration(this.registration.value).subscribe((data: any) => {
      //console.log(data);
      //console.log(this.registration.value);
      localStorage.setItem('userID', data.user_id);
      this.msg.success('user registred successfully');
      this.router.navigate(['/login']);

    },
    (err: HttpErrorResponse) => {
    console.log(err);
      this.isLoginError = true;
    }); 
  }

  
}
}
