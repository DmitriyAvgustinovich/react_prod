import { DropdownDirection } from "../../../types/ui";
import cls from "./Popup.module.scss";

export const mapDirectionClass: Record<DropdownDirection, string> = {
  "top left": cls.optionsTopLeft,
  "top right": cls.optionsTopRight,
  "bottom left": cls.optionsBottomLeft,
  "bottom right": cls.optionsBottomRight,
};
