
export class ImagesUpdate {
  public backdrop_path!: string | null;
  public poster_path!: string | null;

  constructor(backdrop_path: string | null, poster_path: string | null) {
    this.backdrop_path = backdrop_path;
    this.poster_path = poster_path;
  }
}
