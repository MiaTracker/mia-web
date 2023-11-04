import {Deserializable} from "../interfaces/deserializable.interface";

export class Log implements Deserializable {
  public id!: number;
  public date!: Date;
  public rating!: number | null;
  public completed!: boolean;
  public comment!: string | null;

  deserialize(input: any): this {
    return Object.assign(input);
  }

  public static deserialize(input: any): Log {
    let log = new Log().deserialize(input);
    log.date = new Date(input.date)
    return log;
  }
}
