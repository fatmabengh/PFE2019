import { Component, OnInit } from '@angular/core';
import {FormulaireService} from '../shared/formulaire.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit {
  fieldData: any;
  isLoginError = false;
  objectKeys;
  constructor(private formService: FormulaireService,private router: Router) { }

  ngOnInit() {
       this.objectKeys = Object.keys;
    this.formService.GetFormId().subscribe((data: any) => {

      this.fieldData = data;
  /*    for(let i=0;i<this.fieldData.field.length;i++){
          this.fieldData.field[i].items= JSON.parse( this.fieldData.field[i].items);
        console.log( JSON.parse( this.fieldData.field[i].items));
      }  */ 
      this.fieldData.field[0].items= JSON.parse( this.fieldData.field[0].items);
      this.fieldData.field[1].items= JSON.parse( this.fieldData.field[1].items);
     
      
     
    },
    (err: HttpErrorResponse) => {
     console.log(err);
       this.isLoginError = true;
     });
   
  }

}
