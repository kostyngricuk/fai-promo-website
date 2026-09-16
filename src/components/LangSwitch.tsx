import { LOCALES, type LocaleCode } from '../i18n';

interface LangSwitchProps {
  locale: LocaleCode;
  label: string;
  onChange: (next: LocaleCode) => void;
}

export default function LangSwitch({ locale, label, onChange }: LangSwitchProps) {
  return (
    <div className="langs" role="group" aria-label={label}>
      {LOCALES.map(option => (
        <button
          key={option.code}
          type="button"
          lang={option.htmlLang}
          aria-pressed={option.code === locale}
          onClick={() => onChange(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
