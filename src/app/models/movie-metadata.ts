import {Deserializable} from "../interfaces/deserializable.interface";

export class MovieMetadata implements Deserializable {
  public id!: number;
  public backdrop_path!: string | null;
  public homepage!: string | null;
  public tmdb_id!: number | null;
  public imdb_id!: string | null;
  public title!: string | null;
  public overview!: string | null;
  public poster_path!: string | null;
  public tmdb_vote_average!: number | null;
  public original_language!: string | null;
  public release_date!: Date | null;
  public runtime!: number | null;
  public status!: string | null;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.release_date = new Date(input.release_date);
    return this;
  }
}
