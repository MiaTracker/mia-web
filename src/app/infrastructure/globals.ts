import {SearchQuery} from "../models/search-query";

export class Globals {
  public static SearchQuery: SearchQuery = new SearchQuery("", [], false, null);
  public static SearchCommitted: boolean = false;
  public static SearchQueryValid: boolean = true;
}
