import {Deserializable} from "../interfaces/deserializable.interface";

export class AlternativeTitle implements Deserializable {
  public id!: number;
  public title!: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): AlternativeTitle {
    let title = new AlternativeTitle();
    return title.deserialize(input)
  }
}
