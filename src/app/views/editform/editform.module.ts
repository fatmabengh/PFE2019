import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditformRoutingModule } from './editform-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {EditformComponent} from './editform.component';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';

@NgModule({
  declarations: [
    EditformComponent
  ],
  imports: [
    CommonModule,
    EditformRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  
  ]
})
export class EditformModule { }
