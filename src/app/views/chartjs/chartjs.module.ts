import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';
@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ ChartJSComponent ]
})
export class ChartJSModule { }
