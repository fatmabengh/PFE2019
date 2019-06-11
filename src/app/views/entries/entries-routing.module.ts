import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EntriesComponent } from './entries.component';

const routes: Routes = [
  {
    path: 'AllEntries',
    component: EntriesComponent,
    data: {
      title: 'All Entries'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
