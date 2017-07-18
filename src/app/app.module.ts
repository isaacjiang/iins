import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { iinsApp } from './app.component';
import { BasePage } from '../views/base/base';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    iinsApp,
    BasePage,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(iinsApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    iinsApp,
    BasePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}