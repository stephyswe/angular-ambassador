import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { SecureComponent } from './secure.component';



@NgModule({
  declarations: [
    SecureComponent,
    ProfileComponent
  ],
  imports: [
   SharedModule
  ]
})
export class SecureModule { }
