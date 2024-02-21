import {Deserializable} from "../interfaces/deserializable.interface";
import {MediaIndex} from "./media-index.model";

export class Stats implements Deserializable {
  public media!: MediaStats;
  public logs!: LogStats;
  public most_watched!: MostWatchedStats;

  deserialize(input: any): this {
    this.media = MediaStats.deserialize(input.media);
    this.logs = LogStats.deserialize(input.logs);
    this.most_watched = MostWatchedStats.deserialize(input.most_watched);
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

export class MostWatchedStats implements Deserializable {
  public movie!: MediaIndex | undefined;
  public series!: MediaIndex | undefined;

  deserialize(input: any): this {
    this.movie = input.movie ? MediaIndex.deserialize(input.movie) : undefined;
    this.series = input.series ? MediaIndex.deserialize(input.series) : undefined;
    return this;
  }

  public static deserialize(input: any): MostWatchedStats {
    return new MostWatchedStats().deserialize(input);
  }
}
