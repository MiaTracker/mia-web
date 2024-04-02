import {Deserializable} from "../interfaces/deserializable.interface";
import {DateTime} from "luxon";

export class SeriesMetadata implements Deserializable {
  public id!: number;
  public homepage!: string | null;
  public imdb_id!: string | null;
  public title!: string | null;
  public overview!: string | null;
  public original_language!: string | null;
  public first_air_date!: DateTime | null;
  public number_of_episodes!: number | null;
  public number_of_seasons!: number | null;
  public status!: string | null;
  public type!: string | null;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.first_air_date = DateTime.fromISO(input.first_air_date);
    return this;
  }
}
