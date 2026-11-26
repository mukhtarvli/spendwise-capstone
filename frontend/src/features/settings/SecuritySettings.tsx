import { useState } from "react";

import {
  ShieldCheck,
  LockKeyhole,
  Smartphone,
  ShieldAlert,
  Info,
} from "lucide-react";

import ToggleSwitch from "../../components/ui/ToggleSwitch";

import type {
  SecuritySettings as SecuritySettingsData,
} from "../../types/user";

interface SecuritySettingsProps {
  security: SecuritySettingsData;
  onChange: (security: SecuritySettingsData) => void;
}

export default function SecuritySettings({
  security,
  onChange,
}: SecuritySettingsProps) {

  const [showPasswordInfo, setShowPasswordInfo] =
    useState(false);

  // Handle simulated two-factor authentication
  function handleTwoFactorChange(enabled: boolean) {
    onChange({
      ...security,
      twoFactorEnabled: enabled,
    });
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Security
          </h2>

          <p className="text-muted text-sm mt-1">
            Protect your account and financial information.
          </p>
        </div>

      </div>

      {/* Password Management */}
      <div className="flex flex-wrap items-center gap-4 py-6 mt-4 border-t border-border">

        <LockKeyhole
          size={24}
          className="text-muted shrink-0"
        />

        <div className="flex-1">

          <h3 className="font-semibold">
            Change Password
          </h3>

          <p className="text-muted text-sm mt-1">
            Keep your account secure with a strong password.
          </p>

          <p className="text-muted text-xs mt-2">
            Last changed:{" "}
            {security.lastPasswordChanged
              ? security.lastPasswordChanged
              : "Not available"}
          </p>

        </div>

        <button
          type="button"
          onClick={() => setShowPasswordInfo(!showPasswordInfo)}
          aria-expanded={showPasswordInfo}
          className="border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Change Password
        </button>

      </div>

      {/* Password Information */}
      {showPasswordInfo && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">

          <Info
            size={20}
            className="text-primary shrink-0"
          />

          <div>
            <h4 className="font-medium text-blue-800">
              Password management
            </h4>

            <p className="text-sm text-slate-600 mt-1">
              Password changes will become available when
              secure backend authentication is connected.
              This feature is currently a prototype.
            </p>
          </div>

        </div>
      )}

      {/* Two-Factor Authentication */}
      <div className="flex items-center gap-4 py-6 border-t border-border">

        <Smartphone
          size={24}
          className="text-muted shrink-0"
        />

        <div className="flex-1">

          <h3 className="font-semibold">
            Two-Factor Authentication
          </h3>

          <p className="text-muted text-sm mt-1">
            Add an extra layer of protection to your account.
          </p>

          <span
            className={`inline-block text-xs font-medium mt-2 ${
              security.twoFactorEnabled
                ? "text-green-600"
                : "text-muted"
            }`}
          >
            {security.twoFactorEnabled
              ? "Enabled in demo only"
              : "Not enabled"}
          </span>

        </div>

        <ToggleSwitch
          label="Two-factor authentication demo"
          checked={security.twoFactorEnabled}
          onChange={handleTwoFactorChange}
        />

      </div>

      {/* Security Recommendation */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">

        <ShieldAlert
          size={22}
          className="text-primary shrink-0"
        />

        <div>

          <h3 className="font-semibold text-blue-800">
            Security recommendation
          </h3>

          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Use a strong, unique password and enable
            two-factor authentication when available
            to help protect your financial information.
          </p>

        </div>

      </div>

      {/* Prototype Notice */}
      <p className="text-muted text-xs mt-4">
        Security controls are currently for demonstration
        purposes and do not change actual account security.
      </p>

    </div>
  );
}