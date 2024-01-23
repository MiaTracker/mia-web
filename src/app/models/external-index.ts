import {MediaType} from "../enums/media-type.enum";
import {Deserializable} from "../interfaces/deserializable.interface";

export class ExternalIndex implements Deserializable {
  public external_id!: number;
  public type!: MediaType;
  public poster_path!: string | null;
  public title!: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.type = MediaType.parse(input.type);
    return this;
  }

  public static deserialize(input: any): ExternalIndex {
    return new ExternalIndex().deserialize(input);
  }
}
