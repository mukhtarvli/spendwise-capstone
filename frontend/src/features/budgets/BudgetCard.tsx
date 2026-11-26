import {
  Wallet,
  Pencil,
  Trash2,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import type { Budget } from "../../types/budget";
import { formatCurrency } from "../../utils/formatCurrency";

interface BudgetCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
}: BudgetCardProps) {

  // Budget calculations
  const percentage =
    budget.limit > 0
      ? (budget.spent / budget.limit) * 100
      : 0;

  const remaining = budget.limit - budget.spent;

  const isOverBudget = percentage > 100;

  const isLimitReached = percentage >= 100;

  const isNearLimit = percentage >= 80;

  // Progress bar colour
  const progressColor = isLimitReached
    ? "bg-red-500"
    : isNearLimit
      ? "bg-amber-500"
      : "bg-green-500";

  // Status text colour
  const statusColor = isLimitReached
    ? "text-danger"
    : isNearLimit
      ? "text-amber-600"
      : "text-success";

  // Status message
  const status = isOverBudget
    ? "Over budget"
    : isLimitReached
      ? "Limit reached"
      : isNearLimit
        ? "Approaching limit"
        : "On track";

  const StatusIcon = isLimitReached
    ? AlertCircle
    : isNearLimit
      ? AlertTriangle
      : CheckCircle;

  // Format budget month
  const budgetMonth = new Date(
    budget.year,
    budget.month - 1,
    1
  ).toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Card Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <Wallet size={24} />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-lg">
            {budget.category}
          </h2>

          <p className="text-muted text-sm">
            {budgetMonth}
          </p>
        </div>

        <button
          onClick={() => onEdit(budget)}
          className="p-2 text-primary rounded-lg hover:bg-blue-50"
          aria-label={`Edit ${budget.category} budget`}
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(budget.id)}
          className="p-2 text-danger rounded-lg hover:bg-red-50"
          aria-label={`Delete ${budget.category} budget`}
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Spending Amount */}
      <div className="flex items-center justify-between mt-6 gap-2">

        <h3 className="text-2xl font-bold">
          {formatCurrency(budget.spent)}
        </h3>

        <p className="text-muted text-sm">
          of {formatCurrency(budget.limit)}
        </p>

      </div>

      {/* Progress Bar */}
      <div
        role="progressbar"
        aria-label={`${budget.category} budget usage`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(percentage, 100)}
        aria-valuetext={`${percentage.toFixed(1)}% used`}
        className="w-full bg-slate-200 h-3 rounded-full mt-4 overflow-hidden"
      >

        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />

      </div>

      {/* Remaining Budget */}
      <div className="flex items-center justify-between mt-3">

        <p
          className={`text-sm ${
            isOverBudget ? "text-danger" : "text-muted"
          }`}
        >
          {formatCurrency(Math.abs(remaining))}
          {isOverBudget ? " over budget" : " remaining"}
        </p>

        <span className={`text-sm font-semibold ${statusColor}`}>
          {percentage.toFixed(1)}%
        </span>

      </div>

      {/* Budget Status */}
      <div className="border-t border-border mt-5 pt-4">

        <div className={`flex items-center gap-2 text-sm ${statusColor}`}>

          <StatusIcon size={18} />

          <span className="font-medium">
            {status}
          </span>

        </div>

      </div>

    </div>
  );
}