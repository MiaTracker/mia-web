import {Deserializable} from "../interfaces/deserializable.interface";

export class UserIndex implements Deserializable {
  public uuid!: string;
  public username!: string;
  public email!: string;
  public admin!: boolean;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): UserIndex {
    return new UserIndex().deserialize(input);
  }
}
