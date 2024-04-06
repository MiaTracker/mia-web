export interface IAppConfig {
  env: {
    name: string,
    desktop: boolean
  };
  api: {
    url: string,
    pageSize: number
  };
  undefinedImageUrl: string
}
