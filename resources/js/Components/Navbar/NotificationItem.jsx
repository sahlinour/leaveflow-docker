import React from "react";

export default function NotificationItem({ notification, onRead }) {
    return (
        <button
            type="button"
            onClick={() => onRead(notification.id)}
            className={`
                w-full text-left px-4 py-3
                border-b border-slate-100
                transition-colors hover:bg-slate-50
                ${
                    notification.read_at
                        ? "bg-white"
                        : "bg-blue-50/60"
                }
            `}
        >
            <div className="text-sm font-medium text-slate-800">
                {notification.data?.message || "Nouvelle notification"}
            </div>

            <div className="mt-1 text-xs text-slate-400">
                {notification.created_at}
            </div>
        </button>
    );
}