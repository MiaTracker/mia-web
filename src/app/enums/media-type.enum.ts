export enum MediaType {
  Movie = "movie",
  Series = "series"
}

export namespace MediaType {
  export function parse(input: string): MediaType {
    switch (input) {
      case "movie": return MediaType.Movie;
      case "series": return MediaType.Series;
      default:
        throw new Error(`Invalid MediaType string: ${input}`);
    }
  }
}
