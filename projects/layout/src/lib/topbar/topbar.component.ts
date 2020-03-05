import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MENU_CONFIGURATION, IMenuConfig } from '../menu/menu.config';

@Component({
  selector: 'ms-system-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Input() menuActive: boolean;
  @Input() horizontal: boolean;
  @Input() menuHoverActive: boolean;
  @Input() resetMenu: boolean;
  @Output() onSidebarClick = new EventEmitter<any>();
  @Output() onUserMenuClick = new EventEmitter<any>();
  @Output() onUserMenuButtonClick = new EventEmitter<any>();
  @Output() onMenuButtonClick = new EventEmitter<any>();
  @Input() userMenuActive: boolean;

  constructor(@Inject(MENU_CONFIGURATION) config: IMenuConfig) {
  }

  clickSidebar(event: any) {
    this.onSidebarClick.emit(event);
  }

  onSubItemClick(event) {
    event.preventDefault();
  }

  userMenuClick($event): void {
    this.onUserMenuClick.emit($event);
  }

  userMenuButtonClick($event): void {
    this.onUserMenuButtonClick.emit($event);
  }

  menuButtonClick($event): void {
    this.onMenuButtonClick.emit($event);
  }
}
