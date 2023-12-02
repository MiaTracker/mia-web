import {ImagesConfiguration} from "../models/images-configuration.model";
import {HttpHeaders} from "@angular/common/http";

export class AppConstants {
  public static ApiUrl = "http://localhost:3000";
  public static ApiHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlODFiYjY4ZC01MjQxLTRmYTItOTk2OC1jN2FkNDMzNDQ1MWIiLCJpYXQiOjE3MDA5MTMzODIsImV4cCI6MTcwNjA5NzM4Mn0.SNCHFJ3DCMrwg-LCHsZ937AcBT4gveFXmnjKI4fM8D4"
  });
  public static UndefinedImageUrl = "https://imgs.search.brave.com/oB6fgT45DC10B0RQfk3kTBtZ0W-2p7udZUxPnfvKT3M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc";

  public static ImagesConfiguration = new ImagesConfiguration(
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
}
