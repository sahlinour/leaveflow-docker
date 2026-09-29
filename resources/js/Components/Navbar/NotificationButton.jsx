import React from "react";
import { Bell } from "lucide-react";

export default function NotificationButton({
    unreadCount = 0,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Notifications"
            className="
                relative flex h-9 w-9 items-center justify-center
                rounded-lg border border-slate-200
                transition-colors hover:bg-slate-50
            "
        >
            <Bell size={16} className="text-slate-600" />

            {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            )}
        </button>
    );
}