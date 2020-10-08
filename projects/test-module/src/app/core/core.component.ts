import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div id="test-module">
      <div class="card">
        <div class="content">
          <a routerLink="page1">Flight Search</a> | <a routerLink="page2">Advanced</a>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class CoreComponent {
}
