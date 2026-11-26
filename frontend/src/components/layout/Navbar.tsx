import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-border px-8 py-5 flex items-center justify-between">

      <div>
        <h2 className="text-xl font-semibold">
          Personal Finance
        </h2>

        <p className="text-sm text-muted">
          Manage your money smarter
        </p>
      </div>

      <div className="flex items-center gap-6">

        <Bell size={22} className="text-muted" />

        <div className="flex items-center gap-3">
          <UserCircle size={36} className="text-primary" />

          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-muted">Personal Account</p>
          </div>
        </div>

      </div>

    </header>
  );
}