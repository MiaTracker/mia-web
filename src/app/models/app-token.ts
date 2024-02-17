import {Deserializable} from "../interfaces/deserializable.interface";
import {DateTime} from "luxon";

export class AppToken implements Deserializable {
  public name!: string;
  public token!: string;
  public generated!: DateTime;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.generated = DateTime.fromISO(input.generated);
    return this;
  }

  public static deserialize(input: any): AppToken {
    return new AppToken().deserialize(input);
  }
}
