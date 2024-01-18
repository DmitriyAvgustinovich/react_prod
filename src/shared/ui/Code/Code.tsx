import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import CopyIcon from "shared/assets/icons/copy.svg";
import cls from "./Code.module.scss";
import { Button, ButtonTheme } from "../Button/Button";

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = (props: CodeProps) => {
  const { className, text } = props;

  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
        <CopyIcon className={cls.copyIcon} onClick={onCopy} />
      </Button>

      <code>{text}</code>
    </pre>
  );
};
