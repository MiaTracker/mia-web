import {UserToken} from "../models/user-token";

export class AppRuntime {
  public token: string | undefined;
  public token_expiry: Date | undefined;

  private constructor() {
  }

  public static load() {
    let tokenJson = localStorage.getItem('token');
    const runtime = new AppRuntime();
    if(tokenJson != null) {
      let model = new UserToken().deserialize(JSON.parse(tokenJson));
      runtime.token = model.token;
      runtime.token_expiry = model.expiry_date;
    }
    return runtime;
  }
}
