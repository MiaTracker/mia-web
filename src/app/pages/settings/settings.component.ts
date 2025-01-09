import { Component } from '@angular/core';
import {AppConfig} from "../../config/app.config";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass'],
    standalone: false
})
export class SettingsComponent {

  protected readonly AppConfig = AppConfig;
}
