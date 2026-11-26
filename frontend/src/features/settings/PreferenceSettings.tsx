import {
  Settings,
  Banknote,
  Languages,
  Sun,
  Moon,
  Monitor,
  CheckCircle,
  Info,
} from "lucide-react";

import type {
  UserPreferences,
  Currency,
  Language,
  Theme,
} from "../../types/user";

interface PreferenceSettingsProps {
  preferences: UserPreferences;
  onChange: (preferences: UserPreferences) => void;
}

const currencyOptions = [
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
] as const;

const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
] as const;

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    background: "bg-slate-100",
    color: "text-slate-700",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    background: "bg-slate-900",
    color: "text-white",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    background: "bg-slate-300",
    color: "text-slate-700",
  },
] as const;

export default function PreferenceSettings({
  preferences,
  onChange,
}: PreferenceSettingsProps) {

  // Update currency
  function handleCurrencyChange(currency: Currency) {
    onChange({
      ...preferences,
      currency,
    });
  }

  // Update language
  function handleLanguageChange(language: Language) {
    onChange({
      ...preferences,
      language,
    });
  }

  // Update theme
  function handleThemeChange(theme: Theme) {
    onChange({
      ...preferences,
      theme,
    });
  }

  const selectClass =
    "w-full sm:w-auto border border-border rounded-lg px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <Settings size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Application Preferences
          </h2>

          <p className="text-muted text-sm mt-1">
            Customize your SpendWise experience.
          </p>
        </div>

      </div>

      {/* Currency Preference */}
      <div className="flex flex-wrap items-center gap-4 py-6 mt-4 border-t border-border">

        <Banknote
          size={24}
          className="text-muted shrink-0"
        />

        <div className="flex-1">

          <label
            htmlFor="currency"
            className="font-semibold"
          >
            Preferred Currency
          </label>

          <p className="text-muted text-sm mt-1">
            Select your preferred display currency.
          </p>

        </div>

        <select
          id="currency"
          value={preferences.currency}
          onChange={(e) =>
            handleCurrencyChange(e.target.value as Currency)
          }
          className={selectClass}
        >
          {currencyOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>

      {/* Language Preference */}
      <div className="flex flex-wrap items-center gap-4 py-6 border-t border-border">

        <Languages
          size={24}
          className="text-muted shrink-0"
        />

        <div className="flex-1">

          <label
            htmlFor="language"
            className="font-semibold"
          >
            Language
          </label>

          <p className="text-muted text-sm mt-1">
            Choose your preferred language.
          </p>

        </div>

        <select
          id="language"
          value={preferences.language}
          onChange={(e) =>
            handleLanguageChange(e.target.value as Language)
          }
          className={selectClass}
        >
          {languageOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>

      {/* Appearance Preference */}
      <div className="py-6 border-t border-border">

        <h3 className="font-semibold">
          Appearance
        </h3>

        <p className="text-muted text-sm mt-1">
          Choose your preferred application theme.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

          {themeOptions.map((option) => {

            const ThemeIcon = option.icon;

            const isSelected =
              preferences.theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  handleThemeChange(option.value)
                }
                className={`border-2 rounded-xl p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "border-primary"
                    : "border-border hover:border-slate-300"
                }`}
              >

                <div
                  className={`h-24 rounded-lg flex items-center justify-center ${option.background}`}
                >
                  <ThemeIcon
                    size={32}
                    className={option.color}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 mt-3">

                  <span className="text-sm font-medium">
                    {option.label}
                  </span>

                  {isSelected && (
                    <CheckCircle
                      size={16}
                      className="text-primary"
                    />
                  )}

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Prototype Information */}
      <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-4">

        <Info
          size={20}
          className="text-muted shrink-0"
        />

        <p className="text-muted text-sm">
          Preferences are updated automatically in this
          prototype. Currency conversion, translations
          and application-wide themes will be implemented
          in a future release.
        </p>

      </div>

    </div>
  );
}