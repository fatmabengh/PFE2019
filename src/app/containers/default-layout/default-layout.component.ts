import { Component, OnDestroy, Inject,OnInit, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {Router} from '@angular/router';
import {ResponseService} from '../../views/shared/response.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy,AfterViewInit {
  usermail;username;responseData: any;lengthReposne;
  today: number = Date.now();
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private ResponseService: ResponseService,private router: Router,@Inject(DOCUMENT) _document?: any) {
   
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  ngAfterViewInit() {
    this.ResponseService.GetAllResponse().subscribe((data: any) => {
      this.responseData= data;
      this.lengthReposne =this.responseData.length;
        
   });
  }
  logout(){
            // remove user from local storage to log user out
       localStorage.removeItem('userToken');
       this.router.navigate(['/login']);
  }
}
