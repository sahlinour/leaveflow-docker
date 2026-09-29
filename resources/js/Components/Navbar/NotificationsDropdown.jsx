import React from "react";
import { Link } from "@inertiajs/react";

import NotificationItem from "./NotificationItem";
import { COLORS } from "../../theme";

export default function NotificationsDropdown({
    notifications = [],
    unreadCount = 0,
    onRead,
    onReadAll,
    onClose,
}) {
    return (
        <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="font-semibold text-slate-800">
                    Notifications
                </span>

                {unreadCount > 0 && (
                    <button
                        type="button"
                        onClick={onReadAll}
                        className="text-sm font-medium hover:underline"
                        style={{ color: COLORS.mid }}
                    >
                        Tout lire
                    </button>
                )}
            </div>

            <div
                className="
                    max-h-80 overflow-y-auto
                    [scrollbar-width:thin]
                    [scrollbar-color:transparent_transparent]
                    hover:[scrollbar-color:#CBD5E1_transparent]
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-transparent
                    hover:[&::-webkit-scrollbar-thumb]:bg-slate-300
                "
            >
                {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-500">
                        Aucune notification
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={onRead}
                        />
                    ))
                )}
            </div>

            <div className="border-t border-slate-100 px-4 py-3">
                <Link
                    href={route("admin.notifications.index")}
                    onClick={onClose}
                    className="block text-center text-sm font-medium hover:opacity-80"
                    style={{ color: COLORS.mid }}
                >
                    Voir toutes les notifications
                </Link>
            </div>
        </div>
    );
}