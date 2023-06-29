import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-5">
      <h1 className="h4 text-muted">
        {t('errorPage.header')}
      </h1>
      <p className="text-muted">
        {t('errorPage.message')}
        <a href="/">{t('errorPage.linkMain')}</a>
      </p>
    </div>
  );
};

export default ErrorPage;
