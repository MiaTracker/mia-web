import {Deserializable} from "../interfaces/deserializable.interface";

export class Log implements Deserializable {
  public id!: number;
  public date!: Date;
  public rating!: number | null;
  public completed!: boolean;
  public comment!: string | null;

  deserialize(input: any): this {
    Object.assign(input);
    this.date = new Date(input.date)
    return this;
  }

  public static deserialize(input: any): Log {
    return new Log().deserialize(input);
  }
}
