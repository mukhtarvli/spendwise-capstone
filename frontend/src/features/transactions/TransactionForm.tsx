import { useState } from "react";
import type { FormEvent } from "react";

import {
  X,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

import type {
  Transaction,
  TransactionType,
} from "../../types/transaction";

import { transactionCategories } from "../../mocks/transactionData";

interface TransactionFormProps {
  transaction?: Transaction;
  onSave: (transaction: Transaction) => void;
  onClose: () => void;
}

export default function TransactionForm({
  transaction,
  onSave,
  onClose,
}: TransactionFormProps) {

  const [name, setName] = useState(
    transaction?.name ?? ""
  );

  const [type, setType] = useState<TransactionType>(
    transaction?.type ?? "expense"
  );

  const [amount, setAmount] = useState(
    transaction ? String(Math.abs(transaction.amount)) : ""
  );

  const [category, setCategory] = useState(
    transaction?.category ?? "Groceries"
  );

  const [date, setDate] = useState(
    transaction?.date ??
      new Date().toLocaleDateString("en-CA")
  );

  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (
      !name.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !date
    ) {
      setError("Please enter valid transaction details.");
      return;
    }

    const savedTransaction: Transaction = {
      id: transaction?.id ?? crypto.randomUUID(),
      name: name.trim(),
      type,
      amount:
        type === "expense"
          ? -numericAmount
          : numericAmount,
      category,
      date,
      source: transaction?.source ?? "manual",
    };

    onSave(savedTransaction);
  };

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-form-title"
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto"
      >

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2
            id="transaction-form-title"
            className="text-2xl font-bold"
          >
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </h2>

          <button onClick={onClose} aria-label="Close">
            <X className="text-muted" />
          </button>

        </div>

        <p className="text-muted text-sm mt-2">
          Record your income or expenses.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">

          {/* Transaction Type */}
          <div>
            <label className="block font-medium mb-2">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                aria-pressed={type === "expense"}
                onClick={() => {
                  setType("expense");
                  setCategory("Groceries");
                }}
                className={`flex items-center justify-center gap-2 border rounded-lg p-3 ${
                  type === "expense"
                    ? "bg-red-50 border-red-500 text-danger"
                    : "border-border"
                }`}
              >
                <ArrowUpRight size={20} />
                Expense
              </button>

              <button
                type="button"
                aria-pressed={type === "income"}
                onClick={() => {
                  setType("income");
                  setCategory("Income");
                }}
                className={`flex items-center justify-center gap-2 border rounded-lg p-3 ${
                  type === "income"
                    ? "bg-green-50 border-green-500 text-success"
                    : "border-border"
                }`}
              >
                <ArrowDownLeft size={20} />
                Income
              </button>

            </div>
          </div>

          {/* Transaction Name */}
          <div>
            <label htmlFor="transaction-name" className="block font-medium mb-2">
              Transaction Name
            </label>

            <input
              id="transaction-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grocery shopping"
              className={inputClass}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="transaction-amount" className="block font-medium mb-2">
              Amount (CAD)
            </label>

            <input
              id="transaction-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className={inputClass}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="transaction-category" className="block font-medium mb-2">
              Category
            </label>

            <select
              id="transaction-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {transactionCategories
                .filter((item) =>
                  type === "income"
                    ? item === "Income" || item === "Other"
                    : item !== "Income"
                )
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="transaction-date" className="block font-medium mb-2">
              Date
            </label>

            <input
              id="transaction-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p role="alert" className="text-danger text-sm">
              {error}
            </p>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">

            <button
              type="button"
              onClick={onClose}
              className="border border-border rounded-lg py-3 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-white rounded-lg py-3 font-medium hover:bg-blue-700"
            >
              Save Transaction
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}