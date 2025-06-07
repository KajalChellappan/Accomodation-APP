import { ChatComponent } from './chat/chat.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AccCardComponent } from './acc-card/acc-card.component';
import { EmptySearchComponent } from './empty-search/empty-search.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SignupComponent } from '../app/signup/signup.component';
import { compileClassMetadata } from '@angular/compiler';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { JwtGuard } from './jwt.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [JwtGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'emptySearch', component: EmptySearchComponent },
  { path: 'accCard', component: AccCardComponent },
  { path: 'addCard', component: AddCardComponent },
  { path: 'selectLanguage', component: SelectLanguageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
