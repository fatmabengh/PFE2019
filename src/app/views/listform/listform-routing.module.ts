import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ListformComponent} from './listform.component';


const routes: Routes = [
  {
    path: 'listform',
    component: ListformComponent,
    data: {
      title: 'All form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListformRoutingModule { }
