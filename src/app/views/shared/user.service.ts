import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { User } from './user';
/* const reqHeader = new HttpHeaders({
  'content-type': 'application/json',
  'No-Auth': 'False',
  'Accept': 'application/json', }); */

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private uri = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  Registration(user: User){
    const body: User = {
      nomComplet: user.nomComplet,
      email: user.email,
      password: user.password
    }
   return this.http.post(this.uri + '/register', body);
  }

  login(email,password){
    const body = {
      email: email,
      password: password,
    }
   
    return this.http.post(this.uri + '/signin', body);
//, {headers: reqHeader}

  }

}
