import {
  Bell,
  Wallet,
  ArrowLeftRight,
  ChartColumn,
  ShieldCheck,
  Info,
} from "lucide-react";

import ToggleSwitch from "../../components/ui/ToggleSwitch";

import type {
  NotificationPreferences,
} from "../../types/user";

interface NotificationSettingsProps {
  notifications: NotificationPreferences;
  onChange: (notifications: NotificationPreferences) => void;
}

const notificationOptions = [
  {
    key: "budgetAlerts",
    title: "Budget Alerts",
    description:
      "Get notified when you approach or exceed your budget limit.",
    icon: Wallet,
  },
  {
    key: "transactionAlerts",
    title: "Transaction Alerts",
    description:
      "Receive notifications about new bank transactions.",
    icon: ArrowLeftRight,
  },
  {
    key: "monthlyReports",
    title: "Monthly Reports",
    description:
      "Receive a monthly summary of your financial activity.",
    icon: ChartColumn,
  },
  {
    key: "securityAlerts",
    title: "Security Alerts",
    description:
      "Receive notifications about important account security activity.",
    icon: ShieldCheck,
  },
] as const;

export default function NotificationSettings({
  notifications,
  onChange,
}: NotificationSettingsProps) {

  // Update an individual notification preference
  function handleToggle(
    key: keyof NotificationPreferences,
    checked: boolean
  ) {
    onChange({
      ...notifications,
      [key]: checked,
    });
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <Bell size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Notifications
          </h2>

          <p className="text-muted text-sm mt-1">
            Choose which notifications you want to receive.
          </p>
        </div>

      </div>

      {/* Notification Options */}
      <div className="mt-6">

        {notificationOptions.map((option) => {

          const NotificationIcon = option.icon;

          return (
            <div
              key={option.key}
              className="flex items-center gap-4 py-6 border-t border-border"
            >

              <NotificationIcon
                size={24}
                className="text-muted shrink-0"
              />

              <div className="flex-1">

                <h3 className="font-semibold">
                  {option.title}
                </h3>

                <p className="text-muted text-sm mt-1">
                  {option.description}
                </p>

              </div>

              <ToggleSwitch
                label={option.title}
                checked={notifications[option.key]}
                onChange={(checked) =>
                  handleToggle(option.key, checked)
                }
              />

            </div>
          );
        })}

      </div>

      {/* Information */}
      <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-4">

        <Info
          size={20}
          className="text-muted shrink-0"
        />

        <p className="text-muted text-sm">
          Your notification preferences are updated
          automatically in this demo. Actual notifications
          will become available when backend services
          are connected.
        </p>

      </div>

    </div>
  );
}