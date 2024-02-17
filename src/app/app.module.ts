import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexPosterComponent } from "./components/index-poster/index-poster.component";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { TagComponent } from './components/tag/tag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogComponent } from './components/log/log.component';
import {AppConfig} from "./config/app.config";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { DetailsPosterComponent } from './components/details-poster/details-poster.component';
import {SeriesDetailsPageComponent} from "./pages/series-details-page/series-details-page.component";
import { TagListComponent } from './components/tag-list/tag-list.component';
import {MatMenuModule} from "@angular/material/menu";
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { MovieMetadataEditComponent } from './dialogs/movie-metadata-edit/movie-metadata-edit.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLuxonDateModule} from "@angular/material-luxon-adapter";
import { SeriesMetadataEditComponent } from './dialogs/series-metadata-edit/series-metadata-edit.component';
import { SourceEditComponent } from './dialogs/source-edit/source-edit.component';
import {MatSelectModule} from "@angular/material/select";
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { LogsComponent } from './components/logs/logs.component';
import { LogEditComponent } from './dialogs/log-edit/log-edit.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/settings/users/users.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import {MatTableModule} from "@angular/material/table";
import { UserEditComponent } from './dialogs/user-edit/user-edit.component';
import { InstancePageComponent } from './pages/instance-page/instance-page.component';
import { TokensComponent } from "./pages/settings/tokens/tokens.component";
import { TokenGenerateComponent } from './dialogs/token-generate/token-generate.component';
import { TokenShowComponent } from './dialogs/token-show/token-show.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { PasswordChangeComponent } from './dialogs/password-change/password-change.component';

export function initialize(appConfig: AppConfig) {
  return () => appConfig.load()
}

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    IndexPosterComponent,
    MovieDetailsPageComponent,
    SeriesDetailsPageComponent,
    TagComponent,
    LogComponent,
    LoginPageComponent,
    BackdropComponent,
    DetailsPosterComponent,
    TagListComponent,
    DeleteConfirmationComponent,
    MovieMetadataEditComponent,
    SeriesMetadataEditComponent,
    SourceEditComponent,
    MediaDetailsComponent,
    LogsComponent,
    LogEditComponent,
    SearchbarComponent,
    SettingsComponent,
    UsersComponent,
    ProfileComponent,
    UserEditComponent,
    InstancePageComponent,
    TokensComponent,
    TokenGenerateComponent,
    TokenShowComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AppConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
