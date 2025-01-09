import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexPosterComponent } from "./components/index-poster/index-poster.component";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import {NgOptimizedImage} from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
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
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
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
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

export function initialize(appConfig: AppConfig) {
  return () => appConfig.load()
}

@NgModule({ declarations: [
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
        PasswordChangeComponent,
        StatsPageComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
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
        MatTooltipModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatCard,
        MatCardTitle,
        MatCardContent],
    providers: [
        AppConfig,
        provideAppInitializer(() => {
        const initializerFn = (initialize)(inject(AppConfig));
        return initializerFn();
        }),
        provideHttpClient(withInterceptorsFromDi()),
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { minWidth: "70rem", width: "70vw" }}
    ]
  },
)
export class AppModule { }
