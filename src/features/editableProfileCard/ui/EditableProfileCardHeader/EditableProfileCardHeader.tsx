import { classNames } from "shared/lib/classNames/classNames";
import React from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "entities/User";
import { HStack } from "shared/ui/Stack/HStack/HStack";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";

interface EditableProfilePageHeaderProps {
  className?: string;
}

export const EditableProfilePageHeader = React.memo(
  (props: EditableProfilePageHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation("profile");

    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const dispatch = useAppDispatch();

    const canEdit = authData?.id === profileData?.id;

    const onEdit = React.useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = React.useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = React.useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <HStack justify="between" max className={classNames("", {}, [className])}>
        <Text title={t("Профиль")} />

        {canEdit && (
          <>
            {readonly ? (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
                data-testid="EditableProfileCardHeader.EditButton"
              >
                {t("Редактировать")}
              </Button>
            ) : (
              <HStack gap="8">
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testid="EditableProfileCardHeader.CancelButton"
                >
                  {t("Отменить")}
                </Button>

                <Button
                  theme={ButtonTheme.OUTLINE}
                  onClick={onSave}
                  data-testid="EditableProfileCardHeader.SaveButton"
                >
                  {t("Сохранить")}
                </Button>
              </HStack>
            )}
          </>
        )}
      </HStack>
    );
  }
);
