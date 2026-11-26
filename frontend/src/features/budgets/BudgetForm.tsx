import { useState } from "react";
import type { FormEvent } from "react";

import { X, Info } from "lucide-react";

import type { Budget } from "../../types/budget";
import { transactionCategories } from "../../mocks/transactionData";

interface BudgetFormProps {
  budget?: Budget;
  existingBudgets: Budget[];
  onSave: (budget: Budget) => void;
  onClose: () => void;
}

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

export default function BudgetForm({
  budget,
  existingBudgets,
  onSave,
  onClose,
}: BudgetFormProps) {

  const currentDate = new Date();

  const [category, setCategory] = useState(
    budget?.category ?? "Groceries"
  );

  const [limit, setLimit] = useState(
    budget ? String(budget.limit) : ""
  );

  const [month, setMonth] = useState(
    budget?.month ?? currentDate.getMonth() + 1
  );

  const [year, setYear] = useState(
    budget?.year ?? currentDate.getFullYear()
  );

  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericLimit = Number(limit);

    // Validate budget limit
    if (
      !Number.isFinite(numericLimit) ||
      numericLimit <= 0
    ) {
      setError("Please enter a valid spending limit.");
      return;
    }

    // Validate month and year
    if (
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12 ||
      !Number.isInteger(year) ||
      year < 2000 ||
      year > 2100
    ) {
      setError("Please select a valid month and year.");
      return;
    }

    // Prevent duplicate monthly budgets
    const duplicateBudget = existingBudgets.some(
      (item) =>
        item.id !== budget?.id &&
        item.category === category &&
        item.month === month &&
        item.year === year
    );

    if (duplicateBudget) {
      setError(
        "A budget already exists for this category and month."
      );
      return;
    }

    const samePeriodAndCategory =
      budget?.category === category &&
      budget?.month === month &&
      budget?.year === year;

    const savedBudget: Budget = {
      id: budget?.id ?? crypto.randomUUID(),
      category,
      limit: numericLimit,
      spent: samePeriodAndCategory
        ? budget?.spent ?? 0
        : 0,
      month,
      year,
    };

    onSave(savedBudget);
  };

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="budget-form-title"
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto"
      >

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2
            id="budget-form-title"
            className="text-2xl font-bold"
          >
            {budget ? "Edit Budget" : "Create Budget"}
          </h2>

          <button onClick={onClose} aria-label="Close">
            <X className="text-muted" />
          </button>

        </div>

        <p className="text-muted text-sm mt-2">
          Set a monthly spending limit for a category.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-6"
        >

          {/* Budget Category */}
          <div>
            <label
              htmlFor="budget-category"
              className="block font-medium mb-2"
            >
              Budget Category
            </label>

            <select
              id="budget-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {transactionCategories
                .filter((item) => item !== "Income")
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* Spending Limit */}
          <div>
            <label
              htmlFor="budget-limit"
              className="block font-medium mb-2"
            >
              Monthly Spending Limit (CAD)
            </label>

            <input
              id="budget-limit"
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="500.00"
              min="0.01"
              step="0.01"
              className={inputClass}
              required
            />
          </div>

          {/* Month and Year */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label
                htmlFor="budget-month"
                className="block font-medium mb-2"
              >
                Month
              </label>

              <select
                id="budget-month"
                value={month}
                onChange={(e) =>
                  setMonth(Number(e.target.value))
                }
                className={inputClass}
              >
                {months.map((item, index) => (
                  <option
                    key={item}
                    value={index + 1}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="budget-year"
                className="block font-medium mb-2"
              >
                Year
              </label>

              <input
                id="budget-year"
                type="number"
                value={year}
                onChange={(e) =>
                  setYear(Number(e.target.value))
                }
                min={2000}
                max={2100}
                step={1}
                className={inputClass}
                required
              />
            </div>

          </div>

          {/* Information */}
          <div className="flex items-start gap-3 bg-blue-50 text-blue-700 rounded-lg p-4">

            <Info size={20} className="shrink-0" />

            <p className="text-sm">
              Your budget helps you monitor spending and
              identify when you're approaching your monthly
              limit.
            </p>

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
              Save Budget
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}