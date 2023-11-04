import {Deserializable} from "../interfaces/deserializable.interface";

export class Genre implements Deserializable {
  public id!: number;
  public name!: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): Genre {
    return new Genre().deserialize(input)
  }
}
