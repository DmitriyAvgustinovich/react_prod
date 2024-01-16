import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Select } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { Currency } from "../../model/types/currency";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = React.memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation("profile");

  const onChangeHandler = React.useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );

  return (
    <Select
      className={classNames("", {}, [className])}
      label={t("Укажите Валюту")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
