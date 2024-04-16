import React from "react";
import { Card } from "shared/ui/Card/Card";
import { HStack, VStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import { StarRating } from "shared/ui/StarRating/StarRating";
import { Modal } from "shared/ui/Modal/Modal";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { BrowserView, MobileOnlyView } from "react-device-detect";
import { Drawer } from "shared/ui/Drawer/Drawer";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = React.memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0,
  } = props;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [starsCount, setStarsCount] = React.useState(rate);
  const [feedback, setFeedback] = React.useState("");

  const onSelectStars = React.useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandler = React.useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = React.useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <VStack max gap="8">
      <Text title={feedbackTitle} />
      <Input placeholder="Ваш отзыв" onChange={setFeedback} />

      <HStack max gap="16" justify="end">
        <Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandler}>
          Закрыть
        </Button>
        <Button onClick={acceptHandler}>Отправить</Button>
      </HStack>
    </VStack>
  );

  return (
    <Card className={className} max>
      <VStack align="center" gap="8">
        <Text title={starsCount ? "Спасибо за отзыв" : title} />
        <StarRating size={40} onSelect={onSelectStars} selectedStars={rate} />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          {modalContent}
        </Modal>
      </BrowserView>

      <MobileOnlyView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          {modalContent}
        </Drawer>
      </MobileOnlyView>
    </Card>
  );
});
