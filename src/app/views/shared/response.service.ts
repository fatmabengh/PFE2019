import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private uri = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  
  GetAllResponse(){   
    return this.http.get(this.uri+'/api/GetResponse');
  }
  SubmitReponse(contenu){
    const body = {
      form_id: parseInt(localStorage.getItem('form_id')),
      content: contenu

    }
    return this.http.post(this.uri + '/form/submit', body);

  }
}
