import {ImagesConfiguration} from "../models/images-configuration.model";
import { HttpHeaders } from "@angular/common/http";

export class AppConstants {
  public readonly configFile = 'assets/config.json';
  public readonly errorsFile = 'assets/errors.json';
  public readonly apiHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  public readonly imagesConfiguration = new ImagesConfiguration(
    "http://image.tmdb.org/t/p/",
    "https://image.tmdb.org/t/p/",
    ["w300", "w780", "w1280", "original"],
    ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  );
  public readonly defaultError = 'An error occurred while talking to the server!';
}
