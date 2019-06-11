import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListformRoutingModule} from './listform-routing.module';
import { ListformComponent} from './listform.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormulaireService} from '../shared/formulaire.service';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { AuthGuard } from '../auth_guards/auth.guard';
import { AuthInterceptor } from '../auth_guards/auth-interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditformComponent } from '../editform/editform.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    ListformComponent,
   // EditformComponent
  ],
  imports: [
    CommonModule,
    ListformRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [FormulaireService,AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }, DatePipe
  ]
/*   entryComponents: [
    EditformComponent
  ]  */
})
export class ListformModule { }
