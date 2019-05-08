import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendformComponent} from './sendform.component';
import { SendformRoutingModule} from './sendform-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {FormulaireService} from '../shared/formulaire.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from '../auth_guards/auth-interceptor';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [
    SendformComponent,
  
  ],
  imports: [
    SendformRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TabsModule.forRoot(),
    QuillModule
  
   
    
  ],
  providers: [FormulaireService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }]

})
export class SendformModule { }
