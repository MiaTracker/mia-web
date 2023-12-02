import {Injectable} from "@angular/core";
import {IAppConfig} from "../interfaces/iapp-config.interface";
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "./app.constants";
import {AppRuntime} from "./app.runtime";

@Injectable()
export class AppConfig {
  static env: IAppConfig;
  static const: AppConstants;
  static run: AppRuntime;

  constructor(private http: HttpClient) {
  }

  load(): Promise<void>  {
    AppConfig.const = new AppConstants();
    AppConfig.run = new AppRuntime();
    return new Promise((resolve, reject) => {
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
  }
}
