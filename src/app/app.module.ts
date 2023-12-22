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
import { AddSearchbarComponent } from './components/add-searchbar/add-searchbar.component';
import { LogComponent } from './components/log/log.component';
import {AppConfig} from "./config/app.config";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { DetailsPosterComponent } from './components/details-poster/details-poster.component';
import {SeriesDetailsPageComponent} from "./pages/series-details-page/series-details-page.component";

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
    AddSearchbarComponent,
    LogComponent,
    LoginPageComponent,
    BackdropComponent,
    DetailsPosterComponent
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
        MatSnackBarModule
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
