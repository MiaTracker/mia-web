export enum SourceType {
  Torrent = "torrent",
  Web = "web",
  Jellyfin = "jellyfin"
}

export namespace SourceType {
  export function parse(input: string): SourceType {
    switch (input) {
      case "torrent": return SourceType.Torrent;
      case "web": return SourceType.Web;
      case "jellyfin": return SourceType.Jellyfin;
      default:
        throw new Error(`Invalid SourceType string: ${input}`);
    }
  }

  export function toDisplay(type: SourceType): string {
    switch (type) {
      case SourceType.Torrent: return "Torrent";
      case SourceType.Web: return "Web";
      case SourceType.Jellyfin: return "Jellyfin";
    }
  }
}
