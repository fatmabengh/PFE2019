import { Component, OnInit,Output, Input, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormControl,FormGroup,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss']
})
export class EditformComponent implements OnInit {
  @Input() form= [];
  ListeCtrl=[];
  formedit: FormGroup;
  objectKeys;
  message=[];
  i=0;
  public event: EventEmitter<any> = new EventEmitter();
  private edit:boolean;
  modalRef: BsModalRef;
  @Input() set edits(value: boolean) {
    this.edit = value;
    this.editForm();
    }
  constructor(public bsModalRef: BsModalRef,private fb: FormBuilder,private modalService: BsModalService) {

   }

  ngOnInit() {
    this.objectKeys = Object.keys;
    this.loadform();
  }
  

   
  loadform(){
    this.formedit = this.fb.group({
   
      'label': new FormControl(''),
      'types': new FormControl(''),
      'subtitle': new FormControl(''),
       items:  this.fb.group({}),
  });  

}

editForm(){
     this.ListeCtrl= [];
    let type= this.form['types'];
    if(type=='check' ||type=='dropdown'||type=='radio'){
  
    Object.keys(this.form['items']).forEach(key => {
     let ctrl = new FormControl(this.form['items'][key]);
     this.itemsE.addControl(key,ctrl);         
       });
    }
  }

  get itemsE() {
    return this.formedit.get('items') as FormGroup;
    }

    addItem(){
         
      Object.keys(this.itemsE.controls).forEach(key => {
         let ctrl = new FormControl('');
         this.itemsE.addControl('id'+ this.i++,ctrl);         
           });          
         }

    removeItem(item) {           
      this.itemsE.removeControl(item);
      }

       Save(){
         this.formedit.get("types").setValue(this.form['types']);
         if (!this.formedit.get("label").dirty){
          this.formedit.get("label").setValue(this.form['label']);
         }
         if (!this.formedit.get("subtitle").dirty){
          this.formedit.get("subtitle").setValue(this.form['subtitle']);
         }
       this.event.emit(this.formedit.value);
        this.modalService.hide(1);
       }
       ngOnDestroy(){
        let type=this.formedit.get("types").value;
        if(type=='check' ||type=='radio'||type=='dropdown' ){
          Object.keys(this.itemsE.controls).forEach(key => {
            this.itemsE.removeControl(key);
          });
        }; 
         this.formedit.reset();
         
       }
}
