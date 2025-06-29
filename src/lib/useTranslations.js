'use client';
import { useParams } from 'next/navigation';
import en from '../locales/en/common.json';
import vi from '../locales/vi/common.json';

const messages = { en, vi };

export const useTranslations = (namespace = '') => {
  const params = useParams();
  const locale = params.locale || 'vi';

  return (key) => {
    const keys = namespace ? `${namespace}.${key}`.split('.') : key.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], messages[locale]);
  };
};
