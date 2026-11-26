import { useState } from "react";
import { Landmark, X, ShieldCheck } from "lucide-react";
import { availableBanks } from "../../mocks/bankData";

interface ConnectBankModalProps {
  onClose: () => void;
  onConnect: (bankName: string) => void;
}

export default function ConnectBankModal({
  onClose,
  onConnect,
}: ConnectBankModalProps) {
  const [selectedBank, setSelectedBank] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-bank-title"
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
      >

        <div className="flex items-center justify-between">

          <h2 id="connect-bank-title" className="text-2xl font-bold">
            Connect your bank
          </h2>

          <button onClick={onClose} aria-label="Close">
            <X className="text-muted" />
          </button>

        </div>

        <p className="text-muted mt-2">
          Select your financial institution.
        </p>

        <div className="space-y-3 mt-6">

          {availableBanks.map((bank) => (
            <button
              key={bank}
              onClick={() => setSelectedBank(bank)}
              aria-pressed={selectedBank === bank}
              className={`w-full flex items-center gap-3 border rounded-lg p-4 text-left transition ${
                selectedBank === bank
                  ? "border-primary bg-blue-50"
                  : "border-border hover:bg-slate-50"
              }`}
            >
              <Landmark className="text-primary" />
              <span className="font-medium">{bank}</span>
            </button>
          ))}

        </div>

        <button
          disabled={!selectedBank}
          onClick={() => onConnect(selectedBank)}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Connect Account
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-muted text-xs">
          <ShieldCheck size={16} />
          Simulated connection — no real credentials required
        </div>

      </div>

    </div>
  );
}