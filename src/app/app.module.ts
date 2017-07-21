import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { iinsApp } from './app.component';

import { BasePage } from '../views/base/base';
import { CustomerPage } from '../views/customer/customer'
import { InsurancePage } from '../views/insurance/insurance'
import { ApplicationsPage } from '../views/applications/applications'
import { SettingsPage } from '../views/settings/settings'

import { Header } from '../components/header/header'
import { SearchPage } from '../components/search/search'

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    iinsApp,
    BasePage,
    CustomerPage,
    InsurancePage,
    ApplicationsPage,
    SearchPage,
    SettingsPage,
    FileSelectDirective,
    Header
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(iinsApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    iinsApp,
    BasePage,
    CustomerPage,
    InsurancePage,
    ApplicationsPage,
    SearchPage,
    SettingsPage,
    Header
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
