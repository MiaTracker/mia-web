import {Deserializable} from "../interfaces/deserializable.interface";

export class LanguageIndex implements Deserializable {
  public iso_639_1!: string;
  public english_name!: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any) {
    return new LanguageIndex().deserialize(input)
  }
}
