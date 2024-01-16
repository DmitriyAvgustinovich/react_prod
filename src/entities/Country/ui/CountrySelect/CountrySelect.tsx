import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Select } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
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
    <Select
      className={classNames("", {}, [className])}
      label={t("Укажите страну")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
