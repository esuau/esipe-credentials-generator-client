import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';

const appRoutes: Routes = [
  { path: '', component: EmailComponent, pathMatch: 'full' },
  { path: 'password', component: PasswordComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
