import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Formulaire} from '../shared/formulaire';
/* const reqHeader = new HttpHeaders({
  'content-type': 'application/json',
  'No-Auth': 'False',
  'Accept': 'application/json', }); */


@Injectable({
  providedIn: 'root'
})
export class FormulaireService {
 ArrayFields = [];
  ItemArray=[];
  form;
  private uri = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }
   setData(FieldsArray) {
    this.ArrayFields= FieldsArray;
    for(let i=0;i<this.ArrayFields.length;i++){
      this.ArrayFields[i]['items']=JSON.stringify(this.ArrayFields[i]['items'])
    }
    //console.log(this.ArrayFields);
} 
setFormData(formData){
  this.form= formData;
}

  PostForm(form) {
  
    const body : Formulaire=  {
      title: form['title'],
      description: form['description'],
      expiration_date: form['expiration_date'] ,
      fields: this.ArrayFields,
      user_id: parseInt(localStorage.getItem('user_id'))
    }
   
    return this.http.post(this.uri + '/api/form', body);

  }
  GetUserform(){   
    return this.http.get(this.uri+'/api/userForm/'+ localStorage.getItem('user_id') );
  }
  GetFormId(){
    return this.http.get(this.uri+'/api/getForm/'+ localStorage.getItem('form_id') );
  }
  DeleteForm(){
    return this.http.delete(this.uri+'/api/deleteform/'+ localStorage.getItem('idForm_Delete') );
  }

  getformEdit(){
    return this.http.get(this.uri+'/api/getForm/'+ localStorage.getItem('idForm_Edit') );
  }


   EditForm(FormEdited){
     
    for(let i=0;i<FormEdited.length;i++){
      FormEdited[i]['items']=JSON.stringify(FormEdited[i]['items'])
    }
    const body : Formulaire=  {
      title: this.form['title'],
      description: this.form['description'],
      expiration_date: this.form['expiration_date'] ,
      fields: FormEdited,
      user_id: parseInt(localStorage.getItem('user_id'))
    }
    console.log(body);
    return this.http.put(this.uri+'/api/UpdateForm/'+ localStorage.getItem('idForm_Edit'), body ); 
  } 
  

}
