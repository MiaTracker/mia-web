import {SearchQuery} from "../models/search-query";
import {SortTarget} from "../enums/sort-target";

export class Globals {
  public static SearchQuery: SearchQuery = new SearchQuery("", [], false, null, SortTarget.Title);
  public static SearchCommitted: boolean = false;
  public static SearchQueryValid: boolean = true;
  public static SearchCurrentPage: number = 0;
  public static SearchLastPageLoaded: boolean = false;
}
