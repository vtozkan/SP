import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { EmptyComponent } from './empty/empty.component';
import { Page2Component } from './page2/page2.component';
import { Page1Component } from './page1/page1.component';
import { RouterModule } from '@angular/router';
import { PushPipe } from './push.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    CoreComponent,
    EmptyComponent,
    PushPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: CoreComponent, children: [
        { path: 'page1', component: Page1Component },
        { path: 'page2', component: Page2Component },
      ]},
      { path: '**', component: EmptyComponent }
    ], { useHash: false }),
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {

  constructor(private injector:Injector){}

  ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, { injector: this.injector})
    customElements.define('test-module', appElement);
    console.log("Bootstrap is done!");
  }
 }
