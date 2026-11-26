import { Landmark, CheckCircle } from "lucide-react";
import type { BankAccount } from "../../types/account";
import { formatCurrency } from "../../utils/formatCurrency";

interface BankAccountCardProps {
  account: BankAccount;
  onDisconnect: (id: string) => void;
}

export default function BankAccountCard({
  account,
  onDisconnect,
}: BankAccountCardProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="bg-blue-100 text-primary p-4 rounded-xl">
          <Landmark size={28} />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-lg">
            {account.bankName}
          </h2>

          <p className="text-muted text-sm">
            {account.accountType} •••• {account.lastFour}
          </p>
        </div>

        <div className="flex items-center gap-1 text-success text-sm">
          <CheckCircle size={16} />
          Connected
        </div>

      </div>

      <div className="border-t border-border mt-6 pt-6 flex items-center justify-between gap-3">

        <div>
          <p className="text-muted text-sm">
            Current Balance
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {formatCurrency(account.balance)}
          </h3>
        </div>

        <button
          onClick={() => onDisconnect(account.id)}
          className="border border-red-200 text-danger px-4 py-2 rounded-lg hover:bg-red-50"
        >
          Disconnect
        </button>

      </div>

    </div>
  );
}