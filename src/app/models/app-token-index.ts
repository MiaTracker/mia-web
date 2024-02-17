import {Deserializable} from "../interfaces/deserializable.interface";
import {DateTime} from "luxon";

export class AppTokenIndex implements Deserializable {
  public name!: string
  public generated!: DateTime

  deserialize(input: any): this {
    Object.assign(this, input);
    this.generated = DateTime.fromISO(input.generated);
    return this;
  }

  public static deserialize(input: any): AppTokenIndex {
    return new AppTokenIndex().deserialize(input);
  }
}
