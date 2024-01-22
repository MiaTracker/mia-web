import {Deserializable} from "../interfaces/deserializable.interface";

export class Log implements Deserializable {
  public id!: number;
  public date!: Date;
  public source!: string;
  public stars!: number | null;
  public completed!: boolean;
  public comment!: string | null;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.date = new Date(input.date)
    return this;
  }

  public static deserialize(input: any): Log {
    return new Log().deserialize(input);
  }
}

export class LogCreate {
  public date!: Date;
  public source!: string;
  public stars!: number | null;
  public completed!: boolean;
  public comment!: string | null;
}
