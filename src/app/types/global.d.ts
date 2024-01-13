declare module "*.scss" {
  interface IClassName {
    [className: string]: string;
  }

  const cssModule: IClassName;
  export = cssModule;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";

  export const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
