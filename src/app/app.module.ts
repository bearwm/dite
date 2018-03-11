import 'polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { DebugUserComponent } from './components/debug-user/debug-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PopupWindowComponent } from './components/popup-window/popup-window.component';
import { UserComponent } from './components/user/user.component';
import { WebviewDirective } from './directives/webview.directive';
import { SuccessResultsPipe } from './pipes/success-results/success-results.pipe';
import { AdminService } from './services/admin.service';
import { ElectronService } from './services/electron.service';
import { FileService } from './services/file.service';
import { LoggerService } from './services/logger.service';
import { UserService } from './services/user.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    DebugUserComponent,
    HomeComponent,
    LoadingComponent,
    PopupWindowComponent,
    SuccessResultsPipe,
    UserComponent,
    WebviewDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    VirtualScrollModule,
  ],
  providers: [
    AdminService,
    ElectronService,
    FileService,
    LoggerService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
