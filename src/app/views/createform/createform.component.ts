import { Component, OnInit,TemplateRef,  ViewChild,AfterViewInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { EditformComponent } from '../editform/editform.component';
import {FormulaireService} from '../shared/formulaire.service';
import { AlertConfig } from 'ngx-bootstrap/alert';
import {ToastrService} from 'ngx-toastr';

// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-createform',
  templateUrl: 'createform.component.html',
  styleUrls: ['./createform.component.scss'],
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class CreateformComponent implements OnInit,AfterViewInit {
  modalRef: BsModalRef;
  selectedLevel: String;
  form: FormGroup;
  formCreate: FormGroup;
  select: String;
  items: FormGroup;
  i=0;
  ctrlListe= [];
  Createdform=[];
  objectKeys;
  message=[];
  edit:  boolean;
  isLoginError = false;
  k; valid: boolean=false;
  @ViewChild('templateConfig') modalTemplate : TemplateRef<any>;
  constructor( private msg: ToastrService,private modalService: BsModalService,private fb: FormBuilder, private formService: FormulaireService) { }

  ngOnInit() {
    this.create();
    this.fromconfig();
    this.objectKeys = Object.keys;
    
   
  }
  ngAfterViewInit() {
    setTimeout(() => {this.openModal(this.modalTemplate)}, 1000);
  }
  create(){
    this.formCreate = this.fb.group({
      'label': new FormControl(''),
      'types': new FormControl(''),
      'subtitle': new FormControl(''),
      'obligation': new FormControl(''),
       items:  this.fb.group({}),   
  });
  }
  fromconfig(){
    this.form= this.fb.group({
      'title': new FormControl('',Validators.required),
      'description': new FormControl(''),
      'expiration_date': new FormControl(''),
    });
  }
  SaveGeneralConfig(){
  if(this.form.valid){
    this.modalRef.hide();}
    
  }
  openModal(templateConfig: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateConfig);
  }
  
  AddFields(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.i=0;
    let type=this.formCreate.get('types').value;
    if(type=='check' ||type=='radio'||type=='dropdown' ){
      for ( let j=0;j<this.ctrlListe.length;j++){
        this.items.removeControl(this.ctrlListe[j]);
       
      }}; 
    this.ctrlListe=[];
    this.formCreate.reset();  
  }
  Save(){
    this.modalRef.hide();
    this.Createdform.push(this.formCreate.value);
    
  }
  addItem(){
    this.ctrlListe= [];
    this.items=this.formCreate.get('items') as FormGroup;
    this.items.addControl('id'+ this.i++, new FormControl(''));
    Object.keys(this.items.controls).forEach(key => {
      this.ctrlListe.push(key);});
  }
  removeItem(item) {
    this.ctrlListe.splice(this.ctrlListe.indexOf(item),1);
    this.items.removeControl(item);
 }
 showEditModal(form){
  this.edit = ! this.edit;
  this.modalRef = this.modalService.show(EditformComponent);
  this.modalRef.content.form=form;
  this.k =  this.Createdform.findIndex(k => k==form)
 this.modalRef.content.edits=this.edit;
 this.modalRef.content.event.subscribe(data => {
  this.Createdform[this.k]=data;
  

});
 }
 saveForm(){
   let formArray= this.Createdform;
  this.formService.setData(formArray);

 this.formService.PostForm(this.form.value).subscribe((data: any) => {
   localStorage.setItem('form_id',data);
   this.valid=true;
  for(let i=0;i<this.Createdform.length;i++){
   this.Createdform[i].items=JSON.parse(this.Createdform[i].items);}
  });
 }
 DeleteFields(form){
  this.Createdform.splice(this.Createdform.findIndex(k => k==form),1);
  this.msg.success('Fields deleted successfully');
 }
 openModalDelete(templateDeleteField: TemplateRef<any>) {
  this.modalRef = this.modalService.show(templateDeleteField, {class: 'modal-sm'});
}


decline(): void {

  this.modalRef.hide();
}
 confirm(form): void{

  this.Createdform.splice(this.Createdform.findIndex(k => k==form),1);
  this.modalRef.hide();
  this.msg.success('Fields deleted successfully');
 }
}
