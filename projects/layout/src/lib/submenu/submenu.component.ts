import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';

@Component({
    selector: '[ms-system-submenu]',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss'],
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px',
            })),
            state('hiddenAnimated', style({
                height: '0px',
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class SubmenuComponent {
    @Input() item: MenuItem;
    @Input() root: boolean;
    @Input() visible: boolean;
    @Input() mega: boolean;
    @Input() menuActive: boolean;
    @Input() horizontal: boolean;
    @Input() menuHoverActive: boolean;


    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    constructor(public router: Router, public location: Location) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.menuHoverActive = !this.menuHoverActive;
            event.preventDefault();
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex as number === index) ? -1 : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (!this.horizontal) {
                this.menuActive = false;
            }

            if (this.horizontal) {
                this.resetMenu = true;
            } else {
                this.resetMenu = false;
            }

            this.menuHoverActive = !this.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.menuHoverActive && this.horizontal
            && !this.isMobile() && !this.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get resetMenu(): boolean {
        return this._reset;
    }

    set resetMenu(val: boolean) {
        this._reset = val;

        if (this._reset && this.horizontal) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }


    isMobile() {
        return window.innerWidth <= 1024;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }
}
