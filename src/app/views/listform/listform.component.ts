import { Component, OnInit,TemplateRef } from '@angular/core';
import {FormulaireService} from '../shared/formulaire.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditformComponent } from '../editform/editform.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.scss']
})
export class ListformComponent implements OnInit {
  formData: any;
  exist: boolean=false;
  fieldData: any;
  objectKeys;
  modalRef: BsModalRef;
  i=0;
  formCreate: FormGroup;
  ctrlListe= [];
  Createdform=[];
  items: FormGroup;
  edit:  boolean;
  k;
  selectedRow ;
  today: number = Date.now();
  dateJour;
  constructor(private fb: FormBuilder,private datePipe: DatePipe,
    private modalService: BsModalService,private formService: FormulaireService,private router: Router,private msg: ToastrService) { }

  ngOnInit() {
    this.create();
    this.exist=false;
    this.objectKeys = Object.keys;
  this.dateJour=this.datePipe.transform(this.today,"yyyy-MM-dd");
    this.formService.GetUserform().subscribe((data: any) => {
      this.formData = data;

    });
   
   
  }
  Show(form_id){ 
    this.router.navigate(['/ShowForm',form_id]);
  }

  DeleteForm(form_id){
   
    localStorage.setItem('idForm_Delete',form_id);
  this.formService.DeleteForm().subscribe((data: any) => {
      this.msg.success(data);
    
    }); 
 
  }
  openModalDelete(templateDeleteField: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateDeleteField, {class: 'modal-sm'});
  }
  decline(): void {

    this.modalRef.hide();
  }

// ******************************************************************
  //2eme fenetre de l'edition du formulaire 

  EditForm(form_id){
    this.exist=true;
    //console.log(form_id);
    localStorage.setItem('idForm_Edit',form_id);
    this.formService.getformEdit().subscribe((data: any) => {
      this.fieldData = data;
   //   console.log(this.fieldData);
    //  console.log(this.fieldData.field[this.fieldData.field.length - 1].id);
      for(let i=0;i<this.fieldData.field.length;i++){
        
        let type=this.fieldData.field[i].types;
        if (type=='check' ||type=='radio'||type=='dropdown'){
          this.fieldData.field[i].items= JSON.parse( this.fieldData.field[i].items);
            }  
        this.Createdform.push( this.fieldData.field[i] );}
    });
  }

  create(){
    this.formCreate = this.fb.group({
      'label': new FormControl(''),
      'types': new FormControl(''),
      'subtitle': new FormControl(''),
       items:  this.fb.group({}),   
  });
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
    console.log(this.formCreate.value);
    
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
   console.log(form.id);
  this.edit = ! this.edit;
  this.modalRef = this.modalService.show(EditformComponent);
  this.modalRef.content.form=form;
  this.k =  this.Createdform.findIndex(k => k==form)
  this.modalRef.content.edits=this.edit;
  this.modalRef.content.event.subscribe(data => {
 // console.log('Child component\'s event was triggered', data);
 console.log(data);
 Object.assign(data, {id: form.id});
 
  this.Createdform[this.k]=data;
  });
 }

 SaveForm(){
  this.exist=false;
 //  console.log(this.Createdform);
   this.formService.setFormData(this.fieldData);
   this.formService.EditForm(this.Createdform).subscribe((data: any) => {
   //  console.log(data);
   this.msg.success(data);

   });
 }
 RowSelected(u:any){
  this.selectedRow=u;
 //console.log(u);
 }
 DeleteFields(field_id){
   console.log(field_id);
   localStorage.setItem('idField_Delete',field_id);
  this.formService.DeleteField().subscribe((data: any) => {
      this.msg.success(data);
    
    }); 
 

 }

}
