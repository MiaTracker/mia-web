import {AlternativeTitle} from "./alternative-title";
import {Language} from "./language";
import {Genre} from "./genre";
import {Tag} from "./tag";
import {Source} from "./source";
import {Log} from "./log";
import {Deserializable} from "../interfaces/deserializable.interface";

export class SeriesDetails implements Deserializable {
  public id!: number;
  public poster_path!: string;
  public backdrop_path!: string;
  public stars!: number | null;
  public title!: string;
  public alternative_titles!: AlternativeTitle[];
  public first_air_date!: Date | null;
  public number_of_episodes!: number | null;
  public number_of_seasons!: number | null;
  public status!: string;
  public type!: string | null;
  public overview!: string | null;
  public tmdb_vote_average!: number | null;
  public original_language!: Language | null;
  public genres!: Genre[];
  public tags!: Tag[];
  public sources!: Source[];
  public logs!: Log[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.first_air_date = new Date(input.first_air_date);
    this.alternative_titles = input.alternative_titles.map((x: any) => AlternativeTitle.deserialize(x));
    this.original_language = Language.deserialize(input.original_language);
    this.genres = input.genres.map((x: any) => Genre.deserialize(x));
    this.tags = input.tags.map((x: any) => Tag.deserialize(x));
    this.sources = input.sources.map((x: any) => Source.deserialize(x));
    this.logs = input.logs.map((x: any) => Log.deserialize(x));
    return this;
  }
}
