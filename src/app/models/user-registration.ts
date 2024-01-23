import {Deserializable} from "../interfaces/deserializable.interface";

export class UserRegistration implements Deserializable {
  public username!: string;
  public email!: string;
  public password!: string;
  public password_repeat!: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): UserRegistration {
    return new UserRegistration().deserialize(input);
  }
}
