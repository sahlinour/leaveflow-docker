import React from "react";
import { COLORS } from "../../theme";

export default function SidebarFooter({
    user,
    collapsed,
}) {
    if (!user) {
        return null;
    }

    const userName =
        user.name ||
        user.nom_complet ||
        "Utilisateur";

    const userEmail =
        user.email ||
        "";

    const userInitials =
        user.initials ||
        userName
            .split(" ")
            .filter(Boolean)
            .map((part) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();

    return (
        <div className="shrink-0 border-t border-slate-200 p-4">
            {!collapsed && (
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white"
                        style={{
                            backgroundColor: COLORS.mid,
                        }}
                    >
                        {userInitials}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                            {userName}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                            {userEmail}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}