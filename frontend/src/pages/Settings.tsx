import { useState } from "react";

import {
  UserRound,
  ShieldCheck,
  Bell,
  Settings as SettingsIcon,
  Database,
} from "lucide-react";

import ProfileSettings from "../features/settings/ProfileSettings";
import SecuritySettings from "../features/settings/SecuritySettings";
import NotificationSettings from "../features/settings/NotificationSettings";
import PreferenceSettings from "../features/settings/PreferenceSettings";
import AccountManagement from "../features/settings/AccountManagement";

import { initialUserSettings } from "../mocks/userData";

import type {
  UserSettings,
  UserProfile,
  SecuritySettings as SecuritySettingsData,
  NotificationPreferences,
  UserPreferences,
} from "../types/user";

type SettingsTab =
  | "profile"
  | "security"
  | "notifications"
  | "preferences"
  | "account";

const settingsTabs = [
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: SettingsIcon,
  },
  {
    id: "account",
    label: "Account Management",
    icon: Database,
  },
] as const;

export default function Settings() {

  // Central settings state
  const [settings, setSettings] =
    useState<UserSettings>(initialUserSettings);

  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  // Update profile
  function handleProfileSave(profile: UserProfile) {
    setSettings((previous) => ({
      ...previous,
      profile,
    }));
  }

  // Update security settings
  function handleSecurityChange(
    security: SecuritySettingsData
  ) {
    setSettings((previous) => ({
      ...previous,
      security,
    }));
  }

  // Update notification preferences
  function handleNotificationChange(
    notifications: NotificationPreferences
  ) {
    setSettings((previous) => ({
      ...previous,
      notifications,
    }));
  }

  // Update application preferences
  function handlePreferenceChange(
    preferences: UserPreferences
  ) {
    setSettings((previous) => ({
      ...previous,
      preferences,
    }));
  }

  // Render the selected settings section
  function renderActiveSection() {

    switch (activeTab) {

      case "profile":
        return (
          <ProfileSettings
            profile={settings.profile}
            onSave={handleProfileSave}
          />
        );

      case "security":
        return (
          <SecuritySettings
            security={settings.security}
            onChange={handleSecurityChange}
          />
        );

      case "notifications":
        return (
          <NotificationSettings
            notifications={settings.notifications}
            onChange={handleNotificationChange}
          />
        );

      case "preferences":
        return (
          <PreferenceSettings
            preferences={settings.preferences}
            onChange={handlePreferenceChange}
          />
        );

      case "account":
        return <AccountManagement />;

      default:
        return null;
    }
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>

        <h1 className="text-3xl font-bold text-secondary">
          Settings
        </h1>

        <p className="text-muted mt-2">
          Manage your account, security and application
          preferences.
        </p>

      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6">

        {/* Settings Navigation */}
        <aside className="bg-white border border-border rounded-xl p-3 shadow-sm h-fit">

          <nav
            aria-label="Settings sections"
            className="space-y-2"
          >

            {settingsTabs.map((tab) => {

              const TabIcon = tab.icon;

              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                    isActive
                      ? "bg-blue-50 text-primary"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >

                  <TabIcon
                    size={20}
                    className="shrink-0"
                  />

                  {tab.label}

                </button>
              );
            })}

          </nav>

        </aside>

        {/* Active Settings Section */}
        <section className="min-w-0">
          {renderActiveSection()}
        </section>

      </div>

    </div>
  );
}