import {SortTarget} from "../enums/sort-target";

export class SearchQuery {
  public constructor(
    public query: String,
    public genres: String[],
    public only_watched: boolean,
    public min_stars: number | null,
    public sort_by: SortTarget
  ) { }
}
