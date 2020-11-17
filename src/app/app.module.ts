import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { NgProgress } from 'ngx-progressbar';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SharingModule } from './modules/sharing/sharing.module';

import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';

import { LoginComponent } from './components/login/login.component';
import { SignupAgreementComponent } from './components/signup/signup-agreement/signup-agreement.component';
import { SignupIndexComponent } from './components/signup/signup-index/signup-index.component';
import { SignupContainerComponent } from './components/signup/signup-container/signup-container.component';
import { BreadcrumbService } from './services/breadcrumb.service';
import { NewsService } from './services/news.service';
import { InstanceService } from './services/instance.service';
import { AppInfoService } from './services/app-info.service';

import { TokenInterceptor } from './interceptors/token.interceptor';

import { ProcessService } from './services/process.service';
import { ActivityService } from './services/activity.service';
import { InfoService } from './services/info.service';
import { MetaService } from './services/meta.service';
import { Title } from '@angular/platform-browser';
import { PinService } from './services/pin.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignupAgreementComponent,
    SignupIndexComponent,
    SignupContainerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AppInfoService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NewsService,
    InstanceService,
    PinService,
    AccountService,
    ActivityService,
    BreadcrumbService,
    InfoService,
    Title,
    MetaService,
    ProcessService,

    NgProgress
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
