import {Injectable} from "@angular/core";
import {IAppConfig} from "../interfaces/iapp-config.interface";
import { HttpClient } from "@angular/common/http";
import {AppConstants} from "./app.constants";
import {AppRuntime} from "./app.runtime";
import {AppErrors} from "./app.errors";

@Injectable()
export class AppConfig {
  static env: IAppConfig;
  static const: AppConstants;
  static run: AppRuntime;
  static errors: AppErrors;

  constructor(private http: HttpClient) {
  }

  load(): Promise<any>  {
    AppConfig.const = new AppConstants();
    AppConfig.run = AppRuntime.load();
    return Promise.all([
      AppErrors.load(this.http).then(x => AppConfig.errors = x, () => console.error("Error loading error messages!") ),
      new Promise<void>((resolve, reject) => {
        this.http.get(AppConfig.const.configFile).subscribe(
          {
            next: value => {
              AppConfig.env = <IAppConfig>value;
            },
            error: err => reject(err),
            complete: () => resolve()
          }
        );
      })
    ])
  }
}
