import {ChangeDetectionStrategy, Component, DestroyRef, effect, EventEmitter, input, Output, signal, untracked} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {filter} from 'rxjs/operators';
import {openCloseAnimation, rotateAnimation} from './menu-item.animations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SidebarItem } from '../../main-screen.component';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    standalone:true,
    imports:[RouterLink, NgClass, NgIf, RouterLinkActive, NgFor],
    animations: [openCloseAnimation, rotateAnimation],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host:{
        '[class.nav-item]':'true',
        '[class.menu-open]':'isMainActive()',
        '[class.menu-is-opening]':'isMainActive()'
    }
})

export class MenuItemComponent {
    isMainActive = input.required<boolean> ();
    menuItem = input.required<SidebarItem> ();

    @Output() onMainMenuClick = new EventEmitter<void> (); 

    constructor(private router: Router, private destroyRef:DestroyRef) {
        // effect(() => {
        //     const menu = this.menuItem();

        //     untracked(() => {
        //         if(menu && menu.children && menu.children.length > 0){
        //             this.isExpandable.set(true);
        //         }
        //     });
        // });
    }

    ngOnInit(): void {
        // this.calculateIsActive(this.router.url);

        // this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
        //     next:(event:any) => {
        //         this.calculateIsActive(event.url);
        //     }
        // });
    }

    public handleMainMenuAction() {
        this.onMainMenuClick.emit();
    }


    // public handleMainMenuAction() {
    //     if (this.isExpandable()) {
    //         this.toggleMenu();
    //         return;
    //     }
    //     const menu = this.menuItem();
    //     const route = menu.route?.split('/');
    //     if(route && route.length){
    //         this.router.navigate(route);
    //     }
    // }

    // public toggleMenu() {
    //     this.isMenuExtended.update(value => !value);
    // }

    // public calculateIsActive(url: string) {
    //     this.isMainActive.set(false);
    //     this.isOneOfChildrenActive.set(false);
    //     const menu = this.menuItem();

    //     if (this.isExpandable()) {
    //         menu.children?.forEach((item) => {
    //             if(item.route === url){
    //                 this.isOneOfChildrenActive.set(true);
    //                 this.isMenuExtended.set(true);
    //             }
    //         });
    //     } else if (menu.route === url) {
    //         this.isMainActive.set(true);
    //     }

    //     if (!this.isMainActive() && !this.isOneOfChildrenActive()) {
    //         this.isMenuExtended.set(false);
    //     }
    // }
}
