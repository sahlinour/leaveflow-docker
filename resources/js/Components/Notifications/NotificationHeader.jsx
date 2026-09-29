import { CheckCheck } from "lucide-react";

export default function NotificationHeader({
    unreadNotificationsCount = 0,
    onReadAll,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    Notifications
                </h1>

                <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                    Consultez toutes vos notifications.
                </p>
            </div>

            {unreadNotificationsCount > 0 && (
                <button
                    onClick={onReadAll}
                    className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-slate-900 text-white text-[11px] sm:text-sm font-medium hover:bg-slate-800 transition"
                >
                    <CheckCheck size={16} />
                    Tout lire
                </button>
            )}
        </div>
    );
}