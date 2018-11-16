import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';

const routes: Routes = [
  { path: '', component: EmailComponent, pathMatch: 'full' },
  { path: 'password', component: PasswordComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
