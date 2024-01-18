import {Observable} from "rxjs";
import {Source, SourceCreate} from "../models/source";

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
}
