import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import StarIcon from "shared/assets/icons/star.svg";
import cls from "./StarRating.module.scss";
import { Icon } from "../Icon/Icon";

interface StarRatingProps {
  className?: string;
  onSelect?: (starNumber: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = React.memo((props: StarRatingProps) => {
  const { className, onSelect, size = 30, selectedStars = 0 } = props;

  const [currentStarsCount, setCurrentStarsCount] =
    React.useState(selectedStars);
  const [isSelected, setIsSelected] = React.useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) setCurrentStarsCount(starsCount);
  };

  const onLeave = () => {
    if (!isSelected) setCurrentStarsCount(0);
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
    }
    setIsSelected(true);
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarsCount >= starNumber ? cls.hovered : cls.normal,
          ])}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={size}
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
});
