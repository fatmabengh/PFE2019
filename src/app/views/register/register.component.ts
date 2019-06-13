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
     
     
    this.UserService.Registration(this.registration.value).subscribe((data: any) => {
     if (data ==true){
        localStorage.setItem('userID', data.user_id);
        this.msg.success('user registred successfully');
        this.router.navigate(['/login']);
      }
      if (data == false) {
        this.msg.error("Username or email exist already");
      }


    }); } else {
      this.msg.error('failed to register ! verify u\'re password');
    }
  }

  
}
}
