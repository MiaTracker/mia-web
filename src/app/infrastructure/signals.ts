import {Signal} from "typed-signals";

export class Signals {
  public static MovieIndexUpdated = new Signal<() => void>();
}
