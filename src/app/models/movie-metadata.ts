import {Deserializable} from "../interfaces/deserializable.interface";
import {DateTime} from "luxon";

export class MovieMetadata implements Deserializable {
  public id!: number;
  public homepage!: string | null;
  public imdb_id!: string | null;
  public title!: string | null;
  public overview!: string | null;
  public original_language!: string | null;
  public release_date!: DateTime | null;
  public runtime!: number | null;
  public status!: string | null;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.release_date = DateTime.fromISO(input.release_date);
    return this;
  }
}
