import {Deserializable} from "../interfaces/deserializable.interface";

export class ImagesConfiguration implements Deserializable{
  public base_url: string;
  public secure_base_url: string;
  public backdrop_sizes: string[];
  public logo_sizes: string[];
  public poster_sizes: string[];
  public profile_sizes: string[];
  public still_sizes: string[];

  constructor(base_url: string, secure_base_url: string, backdrop_sizes: string[], logo_sizes: string[], poster_sizes: string[], profile_sizes: string[], still_sizes: string[]) {
    this.base_url = base_url;
    this.secure_base_url = secure_base_url;
    this.backdrop_sizes = backdrop_sizes;
    this.logo_sizes = logo_sizes;
    this.poster_sizes = poster_sizes;
    this.profile_sizes = profile_sizes;
    this.still_sizes = still_sizes;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
