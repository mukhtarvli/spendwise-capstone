import { useState } from "react";
import { Plus, Wallet } from "lucide-react";

import type { BankAccount } from "../types/account";
import { initialAccounts } from "../mocks/bankData";
import { formatCurrency } from "../utils/formatCurrency";

import BankAccountCard from "../features/accounts/BankAccountCard";
import ConnectBankModal from "../features/accounts/ConnectBankModal";

export default function Accounts() {
  const [accounts, setAccounts] =
    useState<BankAccount[]>(initialAccounts);

  const [showModal, setShowModal] = useState(false);

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const handleConnect = (bankName: string) => {
    const newAccount: BankAccount = {
      id: crypto.randomUUID(),
      bankName,
      accountType: "Chequing Account",
      lastFour: "1024",
      balance: 1500,
    };

    setAccounts((previous) => [...previous, newAccount]);
    setShowModal(false);
  };

  const handleDisconnect = (id: string) => {
    setAccounts((previous) =>
      previous.filter((account) => account.id !== id)
    );
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Bank Accounts
          </h1>

          <p className="text-muted mt-2">
            Manage your connected bank accounts.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Connect Bank
        </button>

      </div>

      {/* Total Balance */}
      <div className="bg-secondary text-white rounded-2xl p-8">

        <Wallet size={30} className="text-blue-400" />

        <p className="text-slate-300 mt-4">
          Total Connected Balance (CAD)
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {formatCurrency(totalBalance)}
        </h2>

        <p className="text-slate-400 mt-3">
          {accounts.length} connected accounts
        </p>

      </div>

      {/* Connected Accounts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Connected Accounts
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {accounts.map((account) => (
            <BankAccountCard
              key={account.id}
              account={account}
              onDisconnect={handleDisconnect}
            />
          ))}

        </div>

        {accounts.length === 0 && (
          <div className="bg-white border border-border rounded-xl p-10 text-center">
            <p className="text-muted">
              No bank accounts connected.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="text-primary font-medium mt-4"
            >
              Connect your first bank
            </button>
          </div>
        )}

      </div>

      {/* Connection Modal */}
      {showModal && (
        <ConnectBankModal
          onClose={() => setShowModal(false)}
          onConnect={handleConnect}
        />
      )}

      <p className="text-sm text-muted">
        Demonstration mode — no real bank accounts are accessed.
      </p>

    </div>
  );
}