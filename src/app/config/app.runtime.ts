import {UserToken} from "../models/user-token";

export class AppRuntime {
  public token: string | undefined;
  public token_expiry: Date | undefined;
  public instance_url: string | undefined;

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

    let instance = localStorage.getItem('instance_url');
    if(instance != null) {
      runtime.instance_url = instance;
    }
    return runtime;
  }

  public clearToken() {
    localStorage.removeItem('token');
    this.token = undefined;
    this.token_expiry = undefined;
  }

  public clearInstance() {
    localStorage.removeItem('instance_url');
    this.instance_url = undefined;
  }
}
