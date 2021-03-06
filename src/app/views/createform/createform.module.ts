import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateformComponent} from './createform.component';
import { CreateformRoutingModule} from './createform-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { EditformComponent } from '../editform/editform.component';
import {FormulaireService} from '../shared/formulaire.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from '../auth_guards/auth-interceptor';
import {AlertsComponent} from '../../views/notifications/alerts.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    CreateformComponent,
    //EditformComponent
    AlertsComponent

    
  ],
  imports: [
    CreateformRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AlertModule.forRoot()
  
   
    
  ],
  providers: [FormulaireService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }]
/*   entryComponents: [
    EditformComponent
  ]  */
})
export class CreateformModule { }
