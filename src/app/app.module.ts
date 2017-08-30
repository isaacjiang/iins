import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {iinsApp} from './app.component';

import {BaseService} from '../views/base/base';
import {CustomerPage} from '../views/customer/customer'
import {InsurancePage} from '../views/insurance/insurance'
import {ApplicationsPage} from '../views/applications/applications'
import {StatisticsPage} from '../views/statistics/statistics'
import {SettingsPage} from '../views/settings/settings'

import {HeaderComponent} from '../components/header/header'
import {SearchComponent} from '../components/search/search'
import {MenuComponent} from '../components/menu/menu'
import {TodoComponent} from '../components/todo/todo'
import {TableComponent} from '../components/table/table'
import {PolicyComponent} from '../components/policy/policy'
import {ApplicationComponent} from "../components/application/application";

import {FileuploadComponent} from '../components/fileupload/fileupload'
import {FileSelectDirective} from 'ng2-file-upload';

@NgModule({
    declarations: [
        iinsApp,
        CustomerPage,
        InsurancePage,
        ApplicationsPage,
        StatisticsPage,
        SearchComponent,
        MenuComponent,
        TodoComponent,
        TableComponent,
        PolicyComponent,
        FileuploadComponent,
        SettingsPage,
        FileSelectDirective,
        HeaderComponent,
        ApplicationComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(iinsApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        iinsApp,
        CustomerPage,
        InsurancePage,
        ApplicationsPage,
        StatisticsPage,
        SettingsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BaseService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
