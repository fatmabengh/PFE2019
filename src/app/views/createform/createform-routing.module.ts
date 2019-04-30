import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CreateformComponent} from './createform.component';


const routes: Routes = [
  {
    path: 'createform',
    component: CreateformComponent,
    data: {
      title: 'Create form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateformRoutingModule { }
