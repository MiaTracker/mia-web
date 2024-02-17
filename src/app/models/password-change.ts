export class PasswordChange {
  public old_password: string;
  public new_password: string;
  public password_repeat: string;

  constructor(oldPass: string, newPass: string, repeatPass: string) {
    this.old_password = oldPass;
    this.new_password = newPass;
    this.password_repeat = repeatPass;
  }
}
