import { Component,OnInit,AfterViewInit } from '@angular/core';
import {FormulaireService} from '../shared/formulaire.service';

@Component({
  templateUrl: 'cards.component.html'
})
export class CardsComponent implements OnInit,AfterViewInit {
  exist: boolean=false;
  objectKeys;formData: any;
  fieldData: any;
  constructor(private formService: FormulaireService) { }
  ngAfterViewInit() {
    this.formService.GetFormId().subscribe((data: any) => {
      this.fieldData = data;
     for(let i=0;i<this.fieldData.field.length;i++){
        this.fieldData.field[i].items= JSON.parse( this.fieldData.field[i].items);
     }  
    });  
  }
  ngOnInit() {
    
    this.exist=false;
    this.objectKeys = Object.keys;   

    }
  
  InvitationForm(){
    this.exist=true;

  }
  ContactForm(){
    this.exist=true;

  }

}
