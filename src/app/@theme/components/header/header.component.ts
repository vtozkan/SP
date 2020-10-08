import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

//import { UserData } from '../../../@core/data/users';
import { UserService } from '../../../@core/utils/user.service';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from '../../../@core/utils/auth.service';
import { BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;
  isLoggedIn: boolean = false;

  // themes = [
  //   {
  //     value: 'default',
  //     name: 'Light',
  //   },
  //   {
  //     value: 'dark',
  //     name: 'Dark',
  //   },
  //   {
  //     value: 'cosmic',
  //     name: 'Cosmic',
  //   },
  //   {
  //     value: 'corporate',
  //     name: 'Corporate',
  //   },
  //   {
  //     value: 'material-light',
  //     name: 'Material Light',
  //   },
  //   {
  //     value: 'material-dark',
  //     name: 'Material Dark',
  //   },
  // ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private authService: AuthService,
    private userService: UserService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private broadcastService: BroadcastService
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    
    this.getProfile();

    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.isLoggedIn = this.authService.loggedIn;
      this.getProfile();
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
      

      this.menuService.onItemClick().subscribe(( event ) => {
        this.onItemSelection(event.item.title);
      })
  }

  //Menu functions
  onItemSelection(title){
    if(title=="Log out")
      this.authService.logout();
  }

  //Theme functions
  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  checkedChange(event){
    if(event)
      this.changeTheme("dark");
    else
      this.changeTheme("default");
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  getProfile(){
    this.userService.getProfile()
    .then(profile=>{
      this.user = profile;
      this.isLoggedIn = this.authService.loggedIn;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
