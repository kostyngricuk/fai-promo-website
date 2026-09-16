import { en } from './en';
import { ru } from './ru';
import type { Dictionary } from './types';

export const LOCALES = [
  { code: 'en', label: 'EN', htmlLang: 'en', dict: en },
  { code: 'ru', label: 'RU', htmlLang: 'ru', dict: ru }
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export function getDictionary(code: LocaleCode): Dictionary {
  return (LOCALES.find(l => l.code === code) ?? LOCALES[0]).dict;
}

export function getHtmlLang(code: LocaleCode): string {
  return (LOCALES.find(l => l.code === code) ?? LOCALES[0]).htmlLang;
}

export function isLocale(value: string): value is LocaleCode {
  return LOCALES.some(l => l.code === value);
}

export type { Dictionary };
export * from './types';
export * from './term';
