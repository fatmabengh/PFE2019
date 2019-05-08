import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormulaireService} from '../shared/formulaire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit,AfterViewInit {
  fieldData: any;
  isLoginError = false;
  objectKeys;
  response: FormGroup;
/*   selectedRadio: string= '';
  selectedCheck: string= ''; */
  listInput=[];
  Listcheck= [];
  ListRadio=[];
  results= [];
  ListDrop=[];
  exist: boolean=false;
 // testObject = {'id_question': '','reponse': ''};
  constructor(private formService: FormulaireService,private router: Router, private fb: FormBuilder,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
       this.objectKeys = Object.keys;
       this.fields();
       
       this.activatedRoute.params.subscribe(params => {
        console.log(params['id']);
        localStorage.setItem('form_id',params['id']);
      });
  
  }
  fields(){
    this.response= this.fb.group({
      'input': new FormControl(''),
      'check': new FormControl(''),
      'drop': new FormControl(''),
      'radio': new FormControl(''),
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
   /*  console.log(this.listInput);
    console.log(this.Listcheck);
    console.log(this.ListRadio); */
    console.log(this.ListDrop);
    this.Listcheck = this.Listcheck.concat(this.listInput);
    console.log(this.Listcheck);
    this.exist=true;
   
  }
  back(){
    console.log('ok');
    this.exist=false;
  }

  selectChangeHandler (id,event: any) {
   // this.selectedRadio = event.target.value;
    this.listInput.push({id_question: id, reponse: event});
    // this.testObject['id_question']=id;
   // this.testObject['reponse']=event; 
  }

  selectChangeHandlercheck(id,event: any,objKey) {
    //update the ui
    //this.selectedCheck = event.target.value;
  
    this.Listcheck.push({id_question: id, reponse: {id: objKey,value:event}});
    //console.log(event,id );
  } 
  selectChangeHandlerRadio(id,event: any,objKey){
    console.log(event,id );
    this.ListRadio.push({id_question: id, reponse: {id: objKey,value:event}});

  }
  selectChangeHandlerDrop(id,event: any,objKey){
    console.log(event,id );
    this.ListDrop.push({id_question: id, reponse: event});

  }
}