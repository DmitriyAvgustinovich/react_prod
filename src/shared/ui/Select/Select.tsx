import { Mods, classNames } from "shared/lib/classNames/classNames";
import React from "react";
import cls from "./Select.module.scss";

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = React.memo((props: SelectProps) => {
  const { className, label, options, value, onChange, readonly } = props;

  const optionsList = React.useMemo(() => {
    return options?.map((option) => (
      <option className={cls.option} key={option.value} value={option.value}>
        {option.content}
      </option>
    ));
  }, [options]);

  const mods: Mods = {};

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}

      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
