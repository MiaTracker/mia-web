import {MediaIndex} from "./media-index.model";
import {ExternalIndex} from "./external-index";
import {Deserializable} from "../interfaces/deserializable.interface";

export class SearchResults implements Deserializable {
  public indexes!: MediaIndex[];
  public external!: ExternalIndex[];
  public query_valid!: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.indexes = input.indexes.map((x: any) => MediaIndex.deserialize(x));
    this.external = input.external.map((x: any) => ExternalIndex.deserialize(x));
    return this;
  }
}
