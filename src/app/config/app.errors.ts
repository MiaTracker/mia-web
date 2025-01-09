import { HttpClient } from "@angular/common/http";
import {AppConfig} from "./app.config";

export class AppErrors {
  private errors: Map<string, string> = new Map();

  public message(error: string): string {
    return this.errors.get(error) ?? AppConfig.const.defaultError;
  }

  static load(http: HttpClient): Promise<AppErrors>  {
    let ins = new AppErrors();
    return new Promise((resolve, reject) => {
      http.get(AppConfig.const.errorsFile).subscribe(
        {
          next: value => {
            const v = value as any;
            for (const key in value) {
              ins.errors.set(key, v[key].toString())
            }
          },
          error: err => reject(err),
          complete: () => resolve(ins)
        }
      );
    })
  }
}
