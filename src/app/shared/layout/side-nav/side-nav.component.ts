import { Component, Input, OnInit } from '@angular/core';
import { appRoutes } from '../../../child-routes';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showMenu = true;
  routes = appRoutes;
  constructor() { }

  ngOnInit(): void {
  }

}
