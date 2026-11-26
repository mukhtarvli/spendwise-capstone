import { NavLink, useNavigate } from "react-router-dom";
import {
  Wallet,
  LayoutDashboard,
  Landmark,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  PiggyBank,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Bank Accounts",
    path: "/accounts",
    icon: Landmark,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Budgets",
    path: "/budgets",
    icon: PiggyBank,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-secondary text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <Wallet size={32} className="text-blue-400" />

        <h1 className="text-2xl font-bold">
          SpendWise
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">

        <p className="text-xs text-slate-400 px-3 mb-4">
          WORKSPACE
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}