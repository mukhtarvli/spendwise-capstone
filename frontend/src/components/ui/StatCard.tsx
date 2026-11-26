import type { LucideIcon } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

interface StatCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  color: string;
  background: string;
}

export default function StatCard({
  title,
  amount,
  icon: Icon,
  color,
  background,
}: StatCardProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      <div className="flex items-center justify-between">
        <p className="text-muted text-sm font-medium">
          {title}
        </p>

        <div className={`p-3 rounded-lg ${background}`}>
          <Icon size={22} className={color} />
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {formatCurrency(amount)}
      </h2>

    </div>
  );
}