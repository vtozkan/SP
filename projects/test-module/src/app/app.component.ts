import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  // selector: 'test',
  template: `
      <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'test-module';
  @Input('state') 
  set state(state: string) {
      console.debug('client-a received state', state);
  }

  @Output() message= new EventEmitter<any>(); ;

  constructor(
    private router: Router) {
  }

  ngOnInit() {

    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements ?
    
    // Standalone mode
    if (environment.standalone) {
      this.router.navigate(['/test-module/page1']);
    }

    // just for demonstration!
    setTimeout(() => { 
      this.message.next('client a initialized!');
    }, 2000);
    
  }
}
