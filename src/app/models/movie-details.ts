import {Deserializable} from "../interfaces/deserializable.interface";
import {AlternativeTitle} from "./alternative-title";
import {Language} from "./language";
import {Genre} from "./genre";
import {Tag} from "./tag";
import {Source} from "./source";
import {Log} from "./log";
import {IMediaDetails} from "../interfaces/imedia-details";

export class MovieDetails implements Deserializable, IMediaDetails {
  public id!: number;
  public poster_path!: string | null;
  public backdrop_path!: string | null;
  public stars!: number | null;
  public title!: string;
  public alternative_titles!: AlternativeTitle[];
  public release_date!: Date | null;
  public runtime!: number | null;
  public status!: string | null;
  public overview!: string | null;
  public tmdb_vote_average!: number | null;
  public on_watchlist!: boolean;
  public original_language!: Language | null;
  public genres!: Genre[];
  public tags!: Tag[];
  public sources!: Source[];
  public logs!: Log[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.release_date = new Date(input.release_date);
    this.alternative_titles = input.alternative_titles.map((x: any) => AlternativeTitle.deserialize(x));
    this.original_language = Language.deserialize(input.original_language);
    this.genres = input.genres.map((x: any) => Genre.deserialize(x));
    this.tags = input.tags.map((x: any) => Tag.deserialize(x));
    this.sources = input.sources.map((x: any) => Source.deserialize(x));
    this.logs = input.logs.map((x: any) => Log.deserialize(x));
    return this;
  }
}
