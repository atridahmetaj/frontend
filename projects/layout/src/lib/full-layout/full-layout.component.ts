import { Component, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ms-system-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
  animations: [
    trigger('mask-anim', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      state(
        'visible',
        style({
          opacity: 0.8
        })
      ),
      transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
  ]
})
export class FullLayoutComponent implements OnDestroy, OnInit {
  menuClick: boolean;

  userMenuClick: boolean;

  topbarUserMenuActive: boolean;

  horizontal = true;

  menuActive: boolean;

  rippleInitListener: any;

  rippleMouseDownListener: any;

  menuHoverActive: boolean;

  resetMenu: boolean;

  topbarColor: string = 'layout-topbar-royal';

  menuColor: string = 'layout-menu-light';


  topbarSize: string = 'medium';
  configDialogActive: boolean;

  constructor(public renderer: Renderer2, public zone: NgZone) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.bindRipple();
    });
  }

  bindRipple(): void {
    this.rippleInitListener = this.init.bind(this);
    document.addEventListener('DOMContentLoaded', this.rippleInitListener);
  }

  init(): void {
    this.rippleMouseDownListener = this.rippleMouseDown.bind(this);
    document.addEventListener('mousedown', this.rippleMouseDownListener, false);
  }

  rippleMouseDown(e) {
    const parentNode = 'parentNode';
    for (let target = e.target; target && target !== this; target = target[parentNode]) {
      if (!this.isVisible(target)) {
        continue;
      }

      // Element.matches() -> https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
      if (this.selectorMatches(target, '.ripplelink, .ui-button, .ui-listbox-item, .ui-multiselect-item, .ui-fieldset-toggler')) {
        const element = target;
        this.rippleEffect(element, e);
        break;
      }
    }
  }

  selectorMatches(el, selector) {
    const matches = 'matches';
    const webkitMatchesSelector = 'webkitMatchesSelector';
    const mozMatchesSelector = 'mozMatchesSelector';
    const msMatchesSelector = 'msMatchesSelector';
    const p = Element.prototype;
    const f =
      p[matches] ||
      p[webkitMatchesSelector] ||
      p[mozMatchesSelector] ||
      p[msMatchesSelector] ||
      function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
    return f.call(el, selector);
  }

  isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight);
  }

  rippleEffect(element, e): void {
    if (element.querySelector('.ink') === null) {
      const inkEl = document.createElement('span');
      this.addClass(inkEl, 'ink');

      if (this.hasClass(element, 'ripplelink') && element.querySelector('span')) {
        element.querySelector('span').insertAdjacentHTML('afterend', '<span class=\'ink\'></span>');
      } else {
        element.appendChild(inkEl);
      }
    }

    const ink = element.querySelector('.ink');
    this.removeClass(ink, 'ripple-animate');

    if (!ink.offsetHeight && !ink.offsetWidth) {
      const d = Math.max(element.offsetWidth, element.offsetHeight);
      ink.style.height = d + 'px';
      ink.style.width = d + 'px';
    }

    const x = e.pageX - this.getOffset(element).left - ink.offsetWidth / 2;
    const y = e.pageY - this.getOffset(element).top - ink.offsetHeight / 2;

    ink.style.top = y + 'px';
    ink.style.left = x + 'px';
    ink.style.pointerEvents = 'none';
    this.addClass(ink, 'ripple-animate');
  }

  hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  addClass(element, className): void {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  removeClass(element, className): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
    };
  }

  unbindRipple(): void {
    if (this.rippleInitListener) {
      document.removeEventListener('DOMContentLoaded', this.rippleInitListener);
    }
    if (this.rippleMouseDownListener) {
      document.removeEventListener('mousedown', this.rippleMouseDownListener);
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className =
      document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  ngOnDestroy() {
    this.unbindRipple();
  }

  onWrapperClick(): void {
    if (!this.menuClick) {
      this.menuActive = false;
    }

    if (!this.userMenuClick) {
      this.topbarUserMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.horizontal) {
        this.resetMenu = true;
      }

      this.menuHoverActive = false;
      this.unblockBodyScroll();
    }

    this.userMenuClick = false;
    this.menuClick = false;
  }

  onMenuButtonClick(event: Event): void {
    this.menuClick = true;

    if (!this.horizontal || this.isMobile()) {
      this.menuActive = !this.menuActive;

      if (this.menuActive) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    }

    event.preventDefault();
  }

  isMobile(): boolean {
    return window.innerWidth <= 1024;
  }

  onTopbarUserMenuButtonClick(event): void {
    this.userMenuClick = true;
    this.topbarUserMenuActive = !this.topbarUserMenuActive;

    event.preventDefault();
  }

  onTopbarUserMenuClick(event): void {
    this.userMenuClick = true;

    if (event.target.nodeName === 'A' || event.target.parentNode.nodeName === 'A') {
      this.topbarUserMenuActive = false;
    }
  }

  onSidebarClick(event: Event): void {
    this.menuClick = true;
    this.resetMenu = false;
  }
}
