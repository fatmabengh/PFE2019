import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormulaireService} from '../shared/formulaire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ResponseService } from '../shared/response.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit,AfterViewInit {
  fieldData: any;
  isLoginError = false;
  objectKeys;
  listInput=[];
  Listcheck= [];
  ListRadio=[];
  results= [];
  ListDrop=[];
  exist: boolean=false;
  inputValue;
  listGlot=[];
  constructor(private ResponseService: ResponseService ,private msg: ToastrService,
    private formService: FormulaireService,private router: Router, private fb: FormBuilder,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
       this.objectKeys = Object.keys;
      this.listGlot= null;
       this.activatedRoute.params.subscribe(params => {
         localStorage.setItem('form_id',params['id']);
      });
  
  }

  ngAfterViewInit() {
    this.formService.GetFormId().subscribe((data: any) => {
      this.fieldData = data;
      console.log(this.fieldData);
      for(let i=0;i<this.fieldData.field.length;i++){
        this.fieldData.field[i].items= JSON.parse( this.fieldData.field[i].items);
     }  
    });  
  }

  SubmitForm(){
    this.Listcheck = this.Listcheck.concat(this.listInput);
    this.ListDrop= this.ListDrop.concat(this.ListRadio);
    this.listGlot=this.ListDrop.concat( this.Listcheck);
   // console.log(this.listGlot);
 this.ResponseService.SubmitReponse(this.listGlot).subscribe((data: any) => {
      this.msg.success(data);
      this.exist=true;
    });  
  }

  back(){
    this.listGlot= null;
    this.exist=false;
    location.reload();
  }
  selectChangeHandlercheck(id,event: any,label,typeC) {
   this.Listcheck.push({id_question: id, reponse: event,titre: label,type: typeC});
   
  } 
  selectChangeHandlerRadio(id,event: any,label,typeR){
    this.ListRadio.push({id_question: id, reponse: event,titre: label,type: typeR});

  }
  selectChangeHandlerDrop(id,event: any,label,typeD){
   this.ListDrop.push({id_question: id, reponse: event,titre: label,type: typeD});

  }
  onKey(event,id,label,typeI) { 
    this.inputValue = event.target.value;
    this.listInput.push({id_question: id, reponse: this.inputValue,titre: label,type: typeI});
  }
}