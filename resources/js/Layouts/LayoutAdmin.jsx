import Sidebar from "@/Components/Sidebar/Sidebar";
import Navbar from "@/Components/Navbar/Navbar";
import { usePage } from "@inertiajs/react";
import { COLORS } from "../theme";

export default function LayoutAdmin({
  page = "Dashboard",
  notificationCount = 0,
  user,
  children,
}) {
  const { auth } = usePage().props;

  const authUser = user || auth?.user;

  const fullName = authUser
    ? `${authUser.prenom || ""} ${authUser.nom || ""}`.trim()
    : "";

  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    : "U";

  const currentUser = {
    ...authUser,
    name: fullName || "Utilisateur",
    email: authUser?.email || "",
    initials,
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: COLORS.bg }}
    >
      <Sidebar user={currentUser} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          page={page}
          notificationCount={notificationCount}
          user={currentUser}
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
