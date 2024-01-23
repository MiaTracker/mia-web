import {MediaIndex} from "./media-index.model";
import {ExternalIndex} from "./external-index";
import {Deserializable} from "../interfaces/deserializable.interface";

export class SearchResults implements Deserializable {
  public indexes!: MediaIndex[];
  public external!: ExternalIndex[];

  deserialize(input: any): this {
    this.indexes = input.indexes.map((x: any) => MediaIndex.deserialize(x));
    this.external = input.external.map((x: any) => ExternalIndex.deserialize(x));
    return this;
  }
}
