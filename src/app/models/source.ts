import {SourceType} from "../enums/source-type";
import {Deserializable} from "../interfaces/deserializable.interface";

export class Source implements Deserializable{
  public id!: number;
  public name!: string;
  public url!: string;
  public type!: SourceType;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.type = SourceType.parse(input.type);
    return this;
  }

  public static deserialize(input: any): Source {
    return new Source().deserialize(input);
  }
}

export class SourceCreate {
  public name!: string;
  public url!: string;
  public type!: SourceType;
}
