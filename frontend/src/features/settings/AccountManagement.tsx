import { useState } from "react";

import {
  Database,
  Download,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

import { initialTransactions } from "../../mocks/transactionData";

export default function AccountManagement() {

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");

  // Export sample financial data
  function handleExport() {

    const exportData = {
      application: "SpendWise",
      environment: "prototype",
      exportedAt: new Date().toISOString(),
      currency: "CAD",
      transactions: initialTransactions,
    };

    const jsonData = JSON.stringify(exportData, null, 2);

    const blob = new Blob([jsonData], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `spendwise-demo-export-${new Date().toISOString().slice(0, 10)}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setMessage("Sample financial data export initiated.");
  }

  // Simulate account deletion
  function handleDeleteAccount() {

    if (confirmation !== "DELETE") {
      return;
    }

    setShowDeleteConfirmation(false);
    setConfirmation("");

    setMessage(
      "Account deletion simulated. No actual account or data was deleted."
    );
  }

  function handleCancel() {
    setShowDeleteConfirmation(false);
    setConfirmation("");
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <Database size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Account Management
          </h2>

          <p className="text-muted text-sm mt-1">
            Manage your account and financial data.
          </p>
        </div>

      </div>

      {/* Export Financial Data */}
      <div className="flex flex-wrap items-center gap-4 py-6 mt-4 border-t border-border">

        <Download
          size={24}
          className="text-muted shrink-0"
        />

        <div className="flex-1">

          <h3 className="font-semibold">
            Export Financial Data
          </h3>

          <p className="text-muted text-sm mt-1">
            Export sample financial transactions
            in JSON format.
          </p>

        </div>

        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <Download size={16} />
          Export Data
        </button>

      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 bg-red-50 rounded-xl p-5">

        <div className="flex items-center gap-2 text-red-700">

          <AlertTriangle size={20} />

          <h3 className="font-semibold">
            Danger Zone
          </h3>

        </div>

        <div className="flex flex-wrap items-center gap-4 mt-5">

          <div className="flex-1">

            <h4 className="font-semibold text-red-800">
              Delete Account
            </h4>

            <p className="text-sm text-red-700 mt-1">
              Permanently remove your SpendWise account
              and associated financial information.
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              setShowDeleteConfirmation(true);
              setConfirmation("");
              setMessage("");
            }}
            className="flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete Account
          </button>

        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirmation && (

          <div className="mt-6 border-t border-red-200 pt-5">

            <h4 className="font-semibold text-red-800">
              Confirm Account Deletion
            </h4>

            <p className="text-sm text-red-700 mt-2">
              In production, deleting your account may
              remove your:
            </p>

            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-red-700">
              <li>Personal profile</li>
              <li>Connected bank accounts</li>
              <li>Transaction history</li>
              <li>Budgets and preferences</li>
            </ul>

            <label
              htmlFor="deleteConfirmation"
              className="block text-sm font-medium text-red-800 mt-5 mb-2"
            >
              Type DELETE to confirm
            </label>

            <input
              id="deleteConfirmation"
              type="text"
              value={confirmation}
              onChange={(e) =>
                setConfirmation(e.target.value)
              }
              placeholder="DELETE"
              autoComplete="off"
              className="w-full bg-white border border-red-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-200"
            />

            <div className="flex justify-end gap-3 mt-4">

              <button
                type="button"
                onClick={handleCancel}
                className="border border-red-200 bg-white rounded-lg px-4 py-2 text-sm hover:bg-red-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={confirmation !== "DELETE"}
                className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Deletion
              </button>

            </div>

          </div>

        )}

      </div>

      {/* Status Message */}
      {message && (

        <div
          role="status"
          className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"
        >

          <CheckCircle
            size={20}
            className="text-primary shrink-0"
          />

          <p className="text-sm text-blue-800">
            {message}
          </p>

        </div>

      )}

      {/* Prototype Notice */}
      <div className="flex items-start gap-3 mt-5">

        <Info
          size={18}
          className="text-muted shrink-0"
        />

        <p className="text-muted text-xs">
          Account management is currently in prototype mode.
          Exported data is fictional, and account deletion
          does not remove actual information.
        </p>

      </div>

    </div>
  );
}