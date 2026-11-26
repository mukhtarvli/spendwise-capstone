import { useState } from "react";

import {
  Plus,
  Wallet,
  TrendingDown,
  PiggyBank,
  CalendarDays,
} from "lucide-react";

import type { Budget } from "../types/budget";
import { initialBudgets } from "../mocks/budgetData";

import BudgetCard from "../features/budgets/BudgetCard";
import BudgetForm from "../features/budgets/BudgetForm";
import StatCard from "../components/ui/StatCard";

export default function Budgets() {
  const currentDate = new Date();

  const [budgets, setBudgets] =
    useState<Budget[]>(initialBudgets);

  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear()
  );

  const [showForm, setShowForm] = useState(false);

  const [editingBudget, setEditingBudget] =
    useState<Budget | undefined>(undefined);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter budgets by month and year
  const filteredBudgets = budgets.filter(
    (budget) =>
      budget.month === selectedMonth &&
      budget.year === selectedYear
  );

  // Calculate total budget
  const totalBudget = filteredBudgets.reduce(
    (total, budget) => total + budget.limit,
    0
  );

  // Calculate total spending
  const totalSpent = filteredBudgets.reduce(
    (total, budget) => total + budget.spent,
    0
  );

  // Calculate remaining budget
  const totalRemaining = totalBudget - totalSpent;

  // Count overspent budgets
  const overBudgetCount = filteredBudgets.filter(
    (budget) => budget.spent > budget.limit
  ).length;

  // Open create budget form
  const handleAdd = () => {
    setEditingBudget(undefined);
    setShowForm(true);
  };

  // Open edit budget form
  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  // Create or update budget
  const handleSave = (budget: Budget) => {
    if (editingBudget) {
      setBudgets((previous) =>
        previous.map((item) =>
          item.id === budget.id ? budget : item
        )
      );
    } else {
      setBudgets((previous) => [
        ...previous,
        budget,
      ]);
    }

    setSelectedMonth(budget.month);
    setSelectedYear(budget.year);

    setShowForm(false);
    setEditingBudget(undefined);
  };

  // Delete budget
  const handleDelete = (id: string) => {
    const budget = budgets.find(
      (item) => item.id === id
    );

    if (!budget) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete your ${budget.category} budget?`
    );

    if (!confirmed) return;

    setBudgets((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Budgets
          </h1>

          <p className="text-muted mt-2">
            Plan your spending and achieve your financial goals.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Budget
        </button>

      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Total Budget"
          amount={totalBudget}
          icon={Wallet}
          color="text-blue-600"
          background="bg-blue-100"
        />

        <StatCard
          title="Total Spent"
          amount={totalSpent}
          icon={TrendingDown}
          color="text-red-600"
          background="bg-red-100"
        />

        <StatCard
          title="Remaining Budget"
          amount={totalRemaining}
          icon={PiggyBank}
          color={
            totalRemaining < 0
              ? "text-red-600"
              : "text-green-600"
          }
          background={
            totalRemaining < 0
              ? "bg-red-100"
              : "bg-green-100"
          }
        />

      </div>

      {/* Overspending Warning */}
      {overBudgetCount > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

          <p className="font-semibold">
            Budget Alert
          </p>

          <p className="text-sm mt-1">
            You have exceeded your spending limit in{" "}
            {overBudgetCount}{" "}
            {overBudgetCount === 1
              ? "category"
              : "categories"}.
          </p>

        </div>
      )}

      {/* Month and Year Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <h2 className="text-xl font-semibold">
          Monthly Budgets
        </h2>

        <div className="flex items-center gap-3">

          <CalendarDays
            size={20}
            className="text-muted"
          />

          <select
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(Number(event.target.value))
            }
            aria-label="Budget month"
            className="bg-white border border-border rounded-lg px-4 py-2"
          >
            {months.map((month, index) => (
              <option
                key={month}
                value={index + 1}
              >
                {month}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={selectedYear}
            onChange={(event) =>
              setSelectedYear(Number(event.target.value))
            }
            min={2000}
            max={2100}
            aria-label="Budget year"
            className="bg-white border border-border rounded-lg px-3 py-2 w-24"
          />

        </div>

      </div>

      {/* Budget Cards */}
      {filteredBudgets.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

        </div>

      ) : (

        <div className="bg-white border border-border rounded-xl p-12 text-center">

          <Wallet
            size={48}
            className="mx-auto text-muted mb-4"
          />

          <h3 className="text-xl font-semibold">
            No budgets found
          </h3>

          <p className="text-muted mt-2">
            Create a budget to start managing your spending.
          </p>

          <button
            onClick={handleAdd}
            className="bg-primary text-white px-5 py-3 rounded-lg mt-6 hover:bg-blue-700"
          >
            Create Budget
          </button>

        </div>

      )}

      {/* Budget Form Modal */}
      {showForm && (
        <BudgetForm
          budget={editingBudget}
          existingBudgets={budgets}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingBudget(undefined);
          }}
        />
      )}

    </div>
  );
}