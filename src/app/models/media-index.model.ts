import {Deserializable} from "../interfaces/deserializable.interface";
import {MediaType} from "../enums/media-type.enum";

export class MediaIndex implements Deserializable {
  public id!: number;
  public type!: MediaType;
  public poster_path!: string | null;
  public stars!: number | null;
  public title!: string;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    this.type = MediaType.parse(input.type);
    return this;
  }

  public static deserialize(input: any): MediaIndex {
    let idx = new MediaIndex();
    idx.deserialize(input);
    return idx;
  }
}
