import { usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";
import { COLORS, employeeNavItems } from "../theme";

export default function EmployeeLayout({ page = "Dashboard", notificationCount = 0, children }) {
  const { auth } = usePage().props;
  const user = auth?.user
    ? {
        name: `${auth.user.prenom} ${auth.user.nom}`,
        email: auth.user.email,
        initials: `${auth.user.prenom?.[0] ?? ""}${auth.user.nom?.[0] ?? ""}`.toUpperCase(),
      }
    : undefined;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: COLORS.bg }}>
      <Sidebar items={employeeNavItems} showRoleSwitch={false} user={user} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar page={page} notificationCount={notificationCount} user={user} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-24 md:pb-6">{children}</main>
      </div>
    </div>
  );
}