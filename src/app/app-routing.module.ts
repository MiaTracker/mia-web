import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {MovieDetailsPageComponent} from "./pages/movie-details-page/movie-details-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SeriesDetailsPageComponent} from "./pages/series-details-page/series-details-page.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {UsersComponent} from "./pages/settings/users/users.component";
import {ProfileComponent} from "./pages/settings/profile/profile.component";
import {InstancePageComponent} from "./pages/instance-page/instance-page.component";
import {TokensComponent} from "./pages/settings/tokens/tokens.component";
import {StatsPageComponent} from "./pages/stats-page/stats-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'media', pathMatch: 'full' },
  { path: 'media', component: IndexPageComponent },
  { path: 'movies', component: IndexPageComponent },
  { path: 'series', component: IndexPageComponent },
  { path: 'watchlist', component: IndexPageComponent },
  { path: 'statistics', component: StatsPageComponent },
  { path: 'movie/:id', component: MovieDetailsPageComponent },
  { path: 'series/:id', component: SeriesDetailsPageComponent },
  { path: 'instance', component: InstancePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'settings', redirectTo: 'settings/profile' },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'tokens', component: TokensComponent },
      { path: 'users', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
