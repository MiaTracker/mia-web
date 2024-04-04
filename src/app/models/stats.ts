import {Deserializable} from "../interfaces/deserializable.interface";
import {MediaIndex} from "./media-index.model";

export class Stats implements Deserializable {
  public media!: MediaStats;
  public logs!: LogStats;
  public genres!: ComparativeStats[];
  public languages!: ComparativeStats[];
  public most_watched!: CategoryStats;
  public highest_rated!: CategoryStats;
  public average_rating!: AvgRatingStats;

  deserialize(input: any): this {
    this.media = MediaStats.deserialize(input.media);
    this.logs = LogStats.deserialize(input.logs);
    this.genres = input.genres.map((x: any) => ComparativeStats.deserialize(x));
    this.languages = input.languages.map((x: any) => ComparativeStats.deserialize(x));
    this.most_watched = CategoryStats.deserialize(input.most_watched);
    this.highest_rated = CategoryStats.deserialize(input.highest_rated);
    this.average_rating = AvgRatingStats.deserialize(input.average_rating);
    return this;
  }

  public static deserialize(input: any): Stats {
    return new Stats().deserialize(input);
  }
}


export class MediaStats implements Deserializable {
  public count!: number;
  public movies!: number;
  public series!: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): MediaStats {
    return new MediaStats().deserialize(input);
  }
}

export class LogStats implements Deserializable {
  public logs!: number;
  public completed!: number;
  public uncompleted!: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): LogStats {
    return new LogStats().deserialize(input);
  }
}

export class CategoryStats implements Deserializable {
  public movie!: MediaIndex | undefined;
  public series!: MediaIndex | undefined;

  deserialize(input: any): this {
    this.movie = input.movie ? MediaIndex.deserialize(input.movie) : undefined;
    this.series = input.series ? MediaIndex.deserialize(input.series) : undefined;
    return this;
  }

  public static deserialize(input: any): CategoryStats {
    return new CategoryStats().deserialize(input);
  }
}

export class ComparativeStats implements Deserializable {
  public name!: string;
  public count!: number;


  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): ComparativeStats {
    return new ComparativeStats().deserialize(input);
  }
}

export class AvgRatingStats implements Deserializable {
  public overall!: number | null;
  public movies!: number | null;
  public series!: number | null;


  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): AvgRatingStats {
    return new AvgRatingStats().deserialize(input);
  }
}
