import { useState } from "react";

import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

import type { Transaction } from "../types/transaction";
import { initialTransactions } from "../mocks/transactionData";

import TransactionForm from "../features/transactions/TransactionForm";
import TransactionTable from "../features/transactions/TransactionTable";
import StatCard from "../components/ui/StatCard";

export default function Transactions() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | undefined>(undefined);

  // Calculate total income
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate total expenses
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + Math.abs(transaction.amount),
      0
    );

  // Calculate net cash flow
  const netCashFlow = totalIncome - totalExpenses;

  // Search and filter transactions
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  // Open add transaction form
  const handleAdd = () => {
    setEditingTransaction(undefined);
    setShowForm(true);
  };

  // Open edit transaction form
  const handleEdit = (transaction: Transaction) => {
    if (transaction.source !== "manual") return;

    setEditingTransaction(transaction);
    setShowForm(true);
  };

  // Create or update transaction
  const handleSave = (transaction: Transaction) => {
    if (editingTransaction) {
      if (editingTransaction.source !== "manual") return;

      setTransactions((previous) =>
        previous.map((item) =>
          item.id === transaction.id &&
          item.source === "manual"
            ? transaction
            : item
        )
      );
    } else {
      setTransactions((previous) => [
        transaction,
        ...previous,
      ]);
    }

    setShowForm(false);
    setEditingTransaction(undefined);
  };

  // Delete transaction
  const handleDelete = (id: string) => {
    const transaction = transactions.find(
      (item) => item.id === id
    );

    if (!transaction || transaction.source !== "manual") {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${transaction.name}"?`
    );

    if (!confirmed) return;

    setTransactions((previous) =>
      previous.filter(
        (item) =>
          item.id !== id || item.source !== "manual"
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-muted mt-2">
            Track and manage your income and expenses.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Transaction
        </button>

      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Total Income"
          amount={totalIncome}
          icon={TrendingUp}
          color="text-green-600"
          background="bg-green-100"
        />

        <StatCard
          title="Total Expenses"
          amount={totalExpenses}
          icon={TrendingDown}
          color="text-red-600"
          background="bg-red-100"
        />

        <StatCard
          title="Net Cash Flow"
          amount={netCashFlow}
          icon={Wallet}
          color="text-blue-600"
          background="bg-blue-100"
        />

      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search transactions..."
            aria-label="Search transactions"
            className="w-full border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter transactions"
          className="border border-border rounded-lg px-4 py-3 outline-none"
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

      </div>

      {/* Transactions Table */}
      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Transaction Form */}
      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(undefined);
          }}
        />
      )}

    </div>
  );
}