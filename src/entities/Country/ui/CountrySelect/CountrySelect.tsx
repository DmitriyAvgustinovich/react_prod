import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/Popups";
import { Country } from "../../model/types/country";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Moldova, content: Country.Moldova },
];

export const CountrySelect = React.memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation("profile");

  const onChangeHandler = React.useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <ListBox
      className={classNames("", {}, [className])}
      value={value}
      onChange={onChangeHandler}
      defaultValue={t("Укажите страну")}
      label={t("Укажите страну")}
      items={options}
      readonly={readonly}
      direction="top right"
    />
  );
});
