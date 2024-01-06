import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Portal } from "shared/ui/Portal/Portal";
import { useTheme } from "app/providers/ThemeProvider";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = ({ className, children, isOpen, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const timeRef = React.useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();

  const closeHandler = React.useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      timeRef.current = setTimeout(() => {
        onClose();

        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeHandler();
    },
    [closeHandler]
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (isOpen) window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
    [cls[theme]]: true,
  };

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
