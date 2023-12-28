declare module "*.scss" {
  interface IClassName {
    [className: string]: string;
  }

  const cssModule: IClassName;
  export = cssModule;
}
