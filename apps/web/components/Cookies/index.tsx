'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import CookieConsent from 'react-cookie-consent';

export default function Cookies() {
  const t = useTranslations("components.cookies");
  return (
    <CookieConsent
      location="bottom"
      buttonText={t("accept")}
      enableDeclineButton
      declineButtonText={t('decline')}
      cookieName="myCookieConsent"
      style={{ background: '#333', color: '#ffffff' }}
    >
      {t("description")}
    </CookieConsent>
  );
};