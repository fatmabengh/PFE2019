import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent} from './entries.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from '../auth_guards/auth-interceptor';
import {FormulaireService} from '../shared/formulaire.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [EntriesComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    HttpClientModule,
    PopoverModule.forRoot(),
    BsDropdownModule
  
  ],
  providers: [FormulaireService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }]
})
export class EntriesModule { }
