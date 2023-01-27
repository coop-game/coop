import main from "./main.json";
import en from "./en.json";
import ko from "./ko.json";

// The default language (ko-kr) must have a value for every message.
// Other languages may have missing messages. If the application finds
// a missing message for the current language, it will use the english
// translation instead.

export const TRANSLATIONS: CPTranslations = [
  { locale: "en", label: "English", messages: en },
  { locale: "ko", label: "한국어", messages: ko },
];

/* ----------------- (do not change) ---------------- */

TRANSLATIONS.sort((a, b) => (a.locale < b.locale ? -1 : 1));

export type CPTranslation = {
  readonly locale: string;
  readonly label: string;
  readonly messages: Partial<typeof main>;
};

export type CPTranslations = CPTranslation[];

export type CPLanguage = CPTranslations[number]["locale"];

export function getTranslation(locale: CPLanguage): CPTranslation {
  const translation = TRANSLATIONS.find((t) => t.locale === locale);

  return {
    locale,
    label: translation?.label ?? locale,
    messages: {
      ...main,
      ...translation?.messages,
    },
  };
}
