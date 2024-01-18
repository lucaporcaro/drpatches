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
      cookieName="myCookieConsent"
      style={{ background: '#333', color: '#fff' }}
    >
      {t("description")}
    </CookieConsent>
  );
};