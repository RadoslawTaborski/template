import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/shared/components/authentication/home/home.component';
import { AuthCallbackComponent } from './modules/shared/components/authentication/auth-callback/auth-callback.component';
import { AuthGuard } from './modules/shared/services/authentication/auth.guard';
import { RegisterComponent } from './modules/shared/components/authentication/account/register/register.component';
import { DemoComponent } from './containers/demo/demo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth-callback', component: AuthCallbackComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'demo', component: DemoComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
