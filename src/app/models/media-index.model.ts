import {Deserializable} from "../interfaces/deserializable.interface";
import {MediaType} from "../enums/media-type.enum";

export class MediaIndex implements Deserializable {
  public id: number;
  public type: MediaType;
  public poster_path: string | null;
  public stars: number | null;
  public title: string;

  constructor(id: number, type: MediaType, poster_path: string | null, stars: number | null, title: string) {
    this.id = id;
    this.type = type;
    this.poster_path = poster_path;
    this.stars = stars;
    this.title = title;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): MediaIndex {
    let idx = new MediaIndex(0, MediaType.Movie, null, null, "");
    idx.deserialize(input);
    idx.type = MediaType.parse(input.type);
    return idx;
  }
}
