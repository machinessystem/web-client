import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BasicLayoutComponent } from './modules/sharing/basic-layout/basic-layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupAgreementComponent } from './components/signup/signup-agreement/signup-agreement.component';
import { SignupIndexComponent } from './components/signup/signup-index/signup-index.component';
import { SignupContainerComponent } from './components/signup/signup-container/signup-container.component';


const routes: Routes = [
  { path: 'i',  loadChildren: () => import('./modules/instance/instance.module').then(x => x.InstanceModule) },
  {
    path: '', data: { breadcrumb: 'Home' }, children: [
      { path: 'account',  loadChildren: () => import('./modules/account/account.module').then(x => x.AccountModule) },
      {
        path: '', component: BasicLayoutComponent, children: [
          { path: '', component: HomeComponent },
          { path: 'news',  loadChildren: () => import('./modules/news/news.module').then(x => x.NewsModule) },
          { path: 'docs',  loadChildren: () => import('./modules/docs/docs.module').then(x => x.DocsModule) },
          {
            path: 'about', data: { breadcrumb: 'About' }, children: [
              { path: '', component: AboutComponent, }
            ]
          },
        ]
      },

      { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
      {
        path: 'signup', component: SignupContainerComponent, data: { breadcrumb: 'Sign Up' }, children: [
          { path: '', component: SignupIndexComponent, },
          { path: 'terms', component: SignupAgreementComponent },
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
