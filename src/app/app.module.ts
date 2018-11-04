import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ItemComponent} from './item/item.component';
import {HomeComponent} from './home/home.component';
import {routing} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpService} from './_services/http.service';
import {AuthenticationService} from './_services/authentication.service';
import {AuthGuard} from './_services/auth.guard';
import {DataService} from './_services/data.service';
import {FakeBackendInterceptor} from './_services/fake-backend.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ItemComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    routing,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    AuthGuard,
    AuthenticationService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
