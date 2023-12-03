import {Deserializable} from "../interfaces/deserializable.interface";

export class UserToken implements Deserializable{
  public token!: string;
  public expiry_date!: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.expiry_date = new Date(input.expiry_date);
    return this;
  }
}
