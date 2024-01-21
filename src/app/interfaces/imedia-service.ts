import {Observable} from "rxjs";
import {Source, SourceCreate} from "../models/source";
import {Log, LogCreate} from "../models/log";

export interface IMediaService {
  createTag(name: string, media_id: number): Observable<Object>;
  deleteTag(tag_id: number, media_id: number): Observable<Object>;
  createGenre(name: string, media_id: number): Observable<Object>;
  deleteGenre(genre_id: number, media_id: number): Observable<Object>;
  createTitle(name: string, media_id: number): Observable<Object>;
  setPrimaryTitle(title_id: number, media_id: number): Observable<Object>;
  deleteTitle(title_id: number, media_id: number): Observable<Object>;
  createSource(source: SourceCreate, media_id: number): Observable<Object>;
  updateSource(source: Source, media_id: number): Observable<Object>;
  deleteSource(source_id: number, media_id: number): Observable<Object>;
  createLog(log: LogCreate, movie_id: number): Observable<Object>;
  updateLog(log: Log, movie_id: number): Observable<Object>;
  deleteLog(log_id: number, movie_id: number): Observable<Object>;
}
