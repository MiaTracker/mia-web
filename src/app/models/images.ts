import {Deserializable} from "../interfaces/deserializable.interface";

export class Images {
  public backdrops!: Image[];
  public posters!: Image[];

  deserialize(input: any): this {
    this.backdrops = input.backdrops.map((x: any) => Image.deserialize(x));
    this.posters = input.posters.map((x: any) => Image.deserialize(x));
    return this;
  }

  public static deserialize(input: any): Images {
    return new Images().deserialize(input)
  }
}

export class Image implements Deserializable {
  public language!: string | null;
  public width!: number;
  public height!: number;
  public file_path!: string;
  public current!: boolean;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public static deserialize(input: any): Image {
    return new Image().deserialize(input)
  }
}
