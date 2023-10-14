import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FrontendProductsComponent } from './frontend-products/frontend-products.component';
import { MainComponent } from './main.component';
import { NavComponent } from './nav/nav.component';
import { SecureModule } from './secure/secure.module';



@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FrontendProductsComponent
  ],
  imports: [
    SharedModule,
    SecureModule
  ]
})
export class MainModule { }
