import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { ListformComponent } from './views/listform/listform.component';
import { EditformComponent } from './views/editform/editform.component';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserService} from './views/shared/user.service';
import { AuthGuard } from './views/auth_guards/auth.guard';
import { AuthInterceptor } from './views/auth_guards/auth-interceptor';
import { FormulaireService } from './views/shared/formulaire.service';
import { ShowFormComponent } from './views/show-form/show-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormeditedComponent } from './views/formedited/formedited.component';
import {CreateformModule} from './views/createform/createform.module';
import {ListformModule} from './views/listform/listform.module';
import { SendformComponent } from './views/sendform/sendform.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CreateformModule,
    ListformModule    
    
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ShowFormComponent,
    FormeditedComponent,
   // ListformComponent,
    EditformComponent,
   SendformComponent
 
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  UserService,AuthGuard,FormulaireService,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }

],
  bootstrap: [ AppComponent ],
  entryComponents: [
    EditformComponent
  ]  
})
export class AppModule { }
