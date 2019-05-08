import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SendformComponent} from './sendform.component';


const routes: Routes = [
  {
    path: 'sendform',
    component: SendformComponent,
    data: {
      title: 'Send form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendformRoutingModule { }
