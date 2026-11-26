interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
}: ToggleSwitchProps) {

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0
        items-center rounded-full
        transition-colors duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2

        ${checked ? "bg-primary" : "bg-slate-300"}

        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
      `}
    >
      <span
        aria-hidden="true"
        className={`
          inline-block h-5 w-5
          rounded-full bg-white shadow-sm
          transition-transform duration-200

          ${
            checked
              ? "translate-x-5"
              : "translate-x-0.5"
          }
        `}
      />
    </button>
  );
}