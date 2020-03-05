import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { MENU_CONFIGURATION, IMenuConfig } from './menu.config';


@Component({
  selector: 'ms-system-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {



  @Input() menuActive: boolean;
  @Input() horizontal: boolean;
  @Input() menuHoverActive: boolean;
  @Input() resetMenu: boolean;
  @Output() onSidebarClick = new EventEmitter<any>();



  model: any[];

  constructor(@Inject(MENU_CONFIGURATION) config: IMenuConfig) {
    this.model = config.items; 
  }

  ngOnInit() {

  }
  clickSidebar(event: any) {
    this.onSidebarClick.emit(event);

  }
}
