import {AlternativeTitle} from "../models/alternative-title";
import {Genre} from "../models/genre";
import {Tag} from "../models/tag";
import {Source} from "../models/source";

export interface IMediaDetails {
  id: number;
  alternative_titles: AlternativeTitle[];
  genres: Genre[],
  tags: Tag[],
  overview: string | null,
  sources: Source[]
}
