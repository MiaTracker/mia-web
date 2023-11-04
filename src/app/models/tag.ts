import {Deserializable} from "../interfaces/deserializable.interface";

export class Tag implements Deserializable {
  public id!: number;
  public name!: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): Tag {
    return new Tag().deserialize(input);
  }
}
