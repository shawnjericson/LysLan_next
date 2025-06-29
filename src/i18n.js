import i18next from 'i18next';

export const getTranslations = async (locale) => {
  const resources = await import(`./locales/${locale}/common.json`);
  await i18next.init({
    lng: locale,
    resources: {
      [locale]: { translation: resources },
    },
  });
  return i18next;
};