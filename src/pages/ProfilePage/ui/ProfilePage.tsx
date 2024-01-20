import {
  ProfileCard,
  fetchProfileData,
  getProfileIsLoading,
  getProfileError,
  profileReducer,
  profileActions,
  getProfileReadonly,
  getProfileForm,
  getProfileValidateErrors,
  ValidateProfileErrors,
} from "entities/Profile";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props;

  const { t } = useTranslation("profile");

  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const { id } = useParams<{ id: string }>();

  const validateErrorTranslates = {
    [ValidateProfileErrors.SERVER_ERROR]: t("Серверная ошибка при сохранении"),
    [ValidateProfileErrors.NO_DATA]: t("Данные не указаны"),
    [ValidateProfileErrors.INCORRECT_USER_DATA]: t("Имя и фамилия обязательны"),
    [ValidateProfileErrors.INCORRECT_AGE]: t("Некорректный возраст"),
    [ValidateProfileErrors.INCORRECT_COUNTRY]: t("Некорректный регион"),
  };

  useInitialEffect(() => {
    if (id) dispatch(fetchProfileData(id));
  });

  const onChangeFirstname = React.useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }));
    },
    [dispatch]
  );

  const onChangeLastname = React.useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch]
  );

  const onChangeAge = React.useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
    },
    [dispatch]
  );

  const onChangeCity = React.useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }));
    },
    [dispatch]
  );

  const onChangeUsername = React.useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }));
    },
    [dispatch]
  );

  const onChangeAvatar = React.useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch]
  );

  const onChangeCurrency = React.useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch]
  );

  const onChangeCountry = React.useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames("", {}, [className])}>
        <ProfilePageHeader />

        {validateErrors?.length &&
          validateErrors.map((error) => (
            <Text
              key={error}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[error]}
            />
          ))}

        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
