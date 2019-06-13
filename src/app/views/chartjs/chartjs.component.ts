import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../shared/formulaire.service';
import {ResponseService} from '../shared/response.service';
@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent implements OnInit  {
  formData: any;
  exist: boolean=false;
  responseData: any;
  FormSelected: Number;
  PeriodSelected;
  dataArray=[];
  ArrayRadio= [];
  ArrayDropDown=[];
  ArrayCheck=[];
  EntrieAnalyzed: Number;
  noData=false;
 
  constructor(private formService: FormulaireService,private ResponseService: ResponseService) { }

  ngOnInit() {
    this.formService.GetUserform().subscribe((data: any) => {
      this.formData = data;   
    });
    this.ResponseService.GetAllResponse().subscribe((data: any) => {
      this.responseData= data;  
     
    });
    
  }
  //éliminer la redondance dans le tableau de X
    cleanArray(array) {
     var i, j, len = array.length, out = [], obj = {};
     for (i = 0; i < len; i++) {
       obj[array[i]] = 0;
     }
     for (j in obj) {
       out.push(j);
     }
     return out;
  }

 //calcul nbre occurences dans un tableau
   countOccurences(tab){
     var result = [];
     tab.forEach(function(elem){
       if(elem in result){
         result[elem] = ++result[elem];
       }
       else{
         result[elem] = 1;
       }
     });
     return result;
  }
 //filtre le tableau selon le form id
   getDimensions(id) {
     var obj = this.responseData.filter(function(node) {
         return node.form_id==id;
     });

     return obj;   
 }
 GetInsights(){
    this.exist=true;
    this.dataArray=[];
    this.ArrayRadio=[];
    this.ArrayDropDown=[];
     var FormTab=this.getDimensions(this.FormSelected);
   //recuperer les reponses dans un tableau dataArray
     for (let i=0;i <FormTab.length;i++){
       this.dataArray.push(FormTab[i].content);
       } 
      
     for (let j=0;j<this.dataArray.length;j++){
       this.EntrieAnalyzed =this.dataArray.length;
     for (let k=0;k<this.dataArray[j].length;k++){     
        if (this.dataArray[j][k].type == 'radio'){
         this.ArrayRadio.push(this.dataArray[j][k].reponse);
         
             }
       else if (this.dataArray[j][k].type == 'dropdown'){
       
         this.ArrayDropDown.push(this.dataArray[j][k].reponse);
         }  
     } 
     }

     let array=this.cleanArray(this.ArrayRadio);        
     let array2= this.countOccurences(this.ArrayRadio);
     this.barChartLabels=array;
     for (let i=0;i <array.length;i++){        
       this.mainChartData1.push(array2[array[i]]);
     }   
   
     let array1=this.cleanArray(this.ArrayDropDown);    
     this.barChartLabels2=array1;    
    let array3= this.countOccurences(this.ArrayDropDown);
    for (let i=0;i <array1.length;i++){        
      this.mainChartData2.push(array3[array1[i]]);
    } 

 
     }
     changedrop(a){
     //  console.log(a);
   
     }

    // barChart1 RadioBoutton
    public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType = 'bar';
    public barChartLegend = true;
   public mainChartData1: Array<number> = [];
  
    public barChartData: any[] = [
      {data: this.mainChartData1, label: 'Series A'}
    ];


    // barChart1 DropDwon
    public barChartOptions2: any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels2: string[] = [];
    public barChartType2 = 'bar';
    public barChartLegend2 = true;
   public mainChartData2: Array<number> = [];
  
    public barChartData2: any[] = [
      {data: this.mainChartData2, label: 'Series A'}
    ];




}
