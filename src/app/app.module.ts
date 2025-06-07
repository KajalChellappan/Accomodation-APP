import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StartComponent } from './start/start.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import {
  ForgotPasswordComponent,
  PasswordDialog,
} from './forgot-password/forgot-password.component';
import { SearchComponent } from './search/search.component';
import { AccCardComponent } from './acc-card/acc-card.component';
import { EmptySearchComponent } from './empty-search/empty-search.component';
import { AddCardComponent } from './add-card/add-card.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectLanguageComponent } from './select-language/select-language.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { I18nModule } from './i18n/i18n.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SearchComponent,
    AccCardComponent,
    EmptySearchComponent,
    AddCardComponent,
    LoginComponent,
    SelectLanguageComponent,
    PasswordDialog,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    TranslateModule,
    HttpClientModule,
    I18nModule,
    MatNativeDateModule,
  ],
  entryComponents: [LoginComponent, PasswordDialog],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
