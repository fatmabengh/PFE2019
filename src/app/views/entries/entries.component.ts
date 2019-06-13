import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ResponseService} from '../shared/response.service';
import {FormulaireService} from '../shared/formulaire.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit,AfterViewInit {
  responseData: any;
  selectedRow;contenu;
  formData: any;
  selected: boolean=false;
  selectData=[];
  constructor(private ResponseService: ResponseService,private formService: FormulaireService) { }

  ngOnInit() {
    this.formService.GetUserform().subscribe((data: any) => {
      this.formData = data;    
    });
  }

  ngAfterViewInit() {
    this.ResponseService.GetAllResponse().subscribe((data: any) => {
     this.responseData= data;   
    
   });
  }
  
  RowSelected(content:any){
    this.selectedRow=content;
   this.contenu=this.selectedRow['content'];  
   
   }

   selectDrop(formSelected){
   
    this.selectData=[];
    for(let i=0; i<this.responseData.length;i++){
      if (formSelected==this.responseData[i].form_id){
        this.selectData.push(this.responseData[i]);
           this.selected=true;

      }    
      }

   }

}
