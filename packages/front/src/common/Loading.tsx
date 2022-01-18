import React from 'react';
import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation();
  return <>{t('Loading...')}</>;
};
