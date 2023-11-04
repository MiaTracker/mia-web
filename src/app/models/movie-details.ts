import {Deserializable} from "../interfaces/deserializable.interface";
import {AlternativeTitle} from "./alternative-title";
import {Language} from "./language";
import {Genre} from "./genre";
import {Tag} from "./tag";
import {Source} from "./source";
import {Log} from "./log";

export class MovieDetails implements Deserializable {
  public id!: number;
  public poster_path!: string | null;
  public backdrop_path!: string | null;
  public stars!: number | null;
  public title!: string;
  public alternative_titles!: AlternativeTitle[];
  public release_date!: Date;
  public runtime!: number | null;
  public status!: string;
  public overview!: string | null;
  public tmdb_vote_average!: number | null;
  public original_language!: Language | null;
  public genres!: Genre[];
  public tags!: Tag[];
  public sources!: Source[];
  public logs!: Log[];

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): MovieDetails {
    let movie = new MovieDetails().deserialize(input);
    movie.release_date = new Date(input.release_date);
    movie.alternative_titles = input.alternative_titles.map((x: any) => AlternativeTitle.deserialize(x));
    movie.original_language = Language.deserialize(input.original_language);
    movie.genres = input.genres.map((x: any) => Genre.deserialize(x));
    movie.tags = input.tags.map((x: any) => Tag.deserialize(x));
    movie.sources = input.sources.map((x: any) => Source.deserialize(x));
    movie.logs = input.logs.map((x: any) => Log.deserialize(x));
    return movie;
  }
}
