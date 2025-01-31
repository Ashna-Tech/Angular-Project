import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, UrlTree, PRIMARY_OUTLET, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

export interface SidebarItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgStyle,NgIf, RouterLink, MenuItemComponent, NgFor, RouterLinkActive],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
  animations: [
    trigger('dropdown', [
      state('collapsed', style({ height: '0', padding: '0' })),
      state('expanded', style({ height: '*', padding: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
    trigger('slide', [
      state('collapsed', style({ left: '-100px' })),
      state('expanded', style({ left: '250px' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
    trigger('showhide', [
      state('show', style({ opacity: '1' })),
      state('hide', style({ opacity: '0' })),
      transition('show <=> hide', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MainScreenComponent implements OnInit, OnDestroy {
  userName: string = 'super admin';

  loadding: boolean = false;

  isSideBarOpened: boolean = true;

  authDataSubscription: Subscription | undefined;

  routerSubscription: Subscription | undefined;

  activeUrl: string = '';

  openedMenu : string | null = null ; 

  menuItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-home',
      route: '/dashboard',
    },
    {
      label: 'Blog Master',
      icon: 'fa-solid fa-blog',
      children: [
        {
          label: 'Blog (TestZone)',
          route: '/dashboard/blog',
        },
        {
          label: 'Blog Category',
          route: '/dashboard/blog-category',
        },
        {
          label: 'Blog Master',
          route: '/dashboard/blog-master',
        },
        {
          label: 'Blog Author',
          route: '/dashboard/blog-author',
        },
        {
          label: 'Blog Left Image',
          route: '/dashboard/blog-left-image',
        },
        {
          label: 'Blog Cuet',
          route: '/dashboard/cuet-blog',
        },
        {
          label: 'Blog Details',
          route: '/dashboard//blog-dtl',
        },
      ],
    },
    {
      label:'Manage Questions',
      icon:'fa-solid fa-clipboard-question',
      children:[
        {
          label:'Manage Category',
          route:'/dashboard/manage-category'
        },
        {
          label:'Manage Sub Category',
          route:'/dashboard/manage-sub-category'
        },
        {
          label:'Manage Chapter',
          route:'/dashboard/manage-chapter'
        },
        {
          label:'Total Chapter Questions',
          route:'/dashboard/total-chapter-question'
        },
        {
          label:'Question Master',
          route:'/dashboard/question-master'
        }
      ]
    },
    {
      label:'Manage Exam',
      icon:'fa-solid fa-newspaper',
      children:[
        {
          label:'Exam Main Category',
          route:'/dashboard/exam-master-category'
        },
        {
          label:'Exam Category',
          route:'/dashboard/exam-category'
        },
        {
          label:'Exam Type',
          route:'/dashboard/exam-type'
        },
        {
          label:'Exam Test Category',
          route:'/dashboard/exam-test-category'
        },
        {
          label:'Exam Content',
          route:'/dashboard/exam-content'
        },
        {
          label:'Exam FAQ',
          route:'/dashboard/exam-faq'
        },
        {
          label:'Exam SEO',
          route:'/dashboard/exam-seo'
        }
      ]
    },
    {
      label:'Manage Youtube',
      icon:'fa-brands fa-youtube',
      children:[
        {
          label:'Youtube Category',
          route:'/dashboard/youtube-category'
        },
        {
          label:'Youtube Sub Category',
          route:'/dashboard/youtube-sub-category'
        },
        {
          label:'Youtube Feed',
          route:'/dashboard/youtube-feed'
        }
      ]
    },
    {
      label:'Manage Test',
      icon:'fa-regular fa-file-lines',
      children:[
        {
          label:'Create Test',
          route:'/dashboard/test'
        },
        {
          label:'Ready to Launch',
          route:'/dashboard/ready-to-launch'
        },
        {
          label:'Total Chapter Questions',
          route:'/dashboard/total-chapter-question'
        },
        {
          label:'Update Test PDFs',
          route:'/dashboard/update-test-pdf'
        },
        {
          label:'Update Test Language',
          route:'/dashboard/update-test-language'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.initializeActiveUrl(this.router.url);
      });

    this.initializeActiveUrl(this.router.url);
  }

  ngOnDestroy(): void {
    if (this.authDataSubscription) {
      this.authDataSubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  logout() {}

  initializeActiveUrl(Url: string) {
    const tree: UrlTree = this.router.parseUrl(Url);
    const primary_outlet = tree.root.children[PRIMARY_OUTLET];

    if (primary_outlet) {
      const segments = primary_outlet.segments;
      const lastSegment = segments.at(-1);

      if (lastSegment !== undefined) {
        this.activeUrl = lastSegment.path;
      }
    }
  }

  toggleMenu(menu : string | undefined){
    if(menu){
      this.openedMenu = this.openedMenu === menu ? null : menu;
    }
  }
}
