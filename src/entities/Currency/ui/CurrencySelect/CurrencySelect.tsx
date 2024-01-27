import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from "shared/ui/ListBox/ListBox";
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
    <ListBox
      className={classNames("", {}, [className])}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue={t("Укажите валюту")}
      label={t("Укажите валюту")}
      readonly={readonly}
      direction="top right"
    />
  );
});
