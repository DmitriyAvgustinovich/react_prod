import React from "react";

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationDelay?: number;
}

export function useModal(props: UseModalProps) {
  const { onClose, isOpen, animationDelay } = props;

  const [isClosing, setIsClosing] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const timeRef = React.useRef() as React.MutableRefObject<
    ReturnType<typeof setTimeout>
  >;

  React.useEffect(() => {
    if (isOpen) setIsMounted(true);
  }, [isOpen]);

  const close = React.useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      timeRef.current = setTimeout(() => {
        onClose();

        setIsClosing(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose]);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    },
    [close]
  );

  React.useEffect(() => {
    if (isOpen) window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    isMounted,
    close,
  };
}
