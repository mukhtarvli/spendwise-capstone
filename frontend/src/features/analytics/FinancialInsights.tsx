import {
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

import type {
  FinancialInsight,
} from "../../types/analytics";

interface FinancialInsightsProps {
  insights: FinancialInsight[];
}

const insightStyles = {
  success: {
    icon: CheckCircle,
    background: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-800",
  },

  warning: {
    icon: AlertTriangle,
    background: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-600",
    titleColor: "text-amber-800",
  },

  info: {
    icon: Info,
    background: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
  },
};

export default function FinancialInsights({
  insights,
}: FinancialInsightsProps) {

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-primary p-3 rounded-xl">
          <Lightbulb size={24} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Financial Insights
          </h2>

          <p className="text-muted text-sm mt-1">
            Understand your financial performance.
          </p>
        </div>

      </div>

      {/* Insights List */}
      <div className="space-y-4 mt-6">

        {insights.length > 0 ? (

          insights.map((insight) => {

            const style = insightStyles[insight.type];

            const InsightIcon = style.icon;

            return (
              <div
                key={insight.id}
                className={`flex items-start gap-3 border rounded-xl p-4 ${style.background} ${style.border}`}
              >

                <InsightIcon
                  size={22}
                  className={`shrink-0 mt-1 ${style.iconColor}`}
                />

                <div className="flex-1">

                  <h3
                    className={`font-semibold ${style.titleColor}`}
                  >
                    {insight.title}
                  </h3>

                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {insight.description}
                  </p>

                </div>

              </div>
            );
          })

        ) : (

          /* Empty State */
          <div className="text-center py-8">

            <Lightbulb
              size={40}
              className="mx-auto text-muted mb-3"
            />

            <h3 className="font-semibold">
              No financial insights yet
            </h3>

            <p className="text-muted text-sm mt-2">
              Financial insights will appear when relevant
              observations are available for your financial data.
            </p>

          </div>

        )}

      </div>

      {/* Disclaimer */}
      <div className="border-t border-border mt-6 pt-4">

        <p className="text-muted text-xs leading-relaxed">
          Insights are automatically generated from your
          financial activity and are intended for informational
          purposes only.
        </p>

      </div>

    </div>
  );
}