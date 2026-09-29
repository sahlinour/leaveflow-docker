import { router } from "@inertiajs/react";
import { Bell, ExternalLink } from "lucide-react";

export default function NotificationItem({ notification, onView, }) {
    const handleView = () => {
        const goToDemande = () => {
            router.get(route("admin.demandes-conges.index"), {
                demande_id: notification.data.demande_id,
            });
        };

        if (!notification.read_at) {
            router.put(
                route("notifications.read", notification.id),
                {},
                {
                    onSuccess: goToDemande,
                }
            );
        } else {
            goToDemande();
        }
    };

    return (
        <div
            className={`p-4 sm:p-5 border-b last:border-b-0 transition ${
                notification.read_at
                    ? "bg-white"
                    : "bg-blue-50/50"
            }`}
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Contenu */}
                <div className="flex gap-3 sm:gap-4 min-w-0">

                    <div
                        className={`flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center ${
                            notification.read_at
                                ? "bg-slate-100 text-slate-500"
                                : "bg-blue-100 text-blue-600"
                        }`}
                    >
                        <Bell size={17} />
                    </div>

                    <div className="min-w-0">

                        <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                                {notification.data?.titre ||
                                    "Nouvelle notification"}
                            </h3>

                            {!notification.read_at && (
                                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-600" />
                            )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            {notification.data?.message}
                        </p>

                        {notification.data?.reference && (
                            <p className="text-[10px] sm:text-xs text-slate-400 mt-2">
                                Référence :{" "}
                                <span className="font-medium">
                                    {notification.data.reference}
                                </span>
                            </p>
                        )}

                        <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                            {new Date(
                                notification.created_at
                            ).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>

                {/* Action */}
                {notification.data?.demande_id && (
                    <button
                        onClick={() => onView(notification)}
                        className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-slate-200 text-[11px] sm:text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap transition"
                    >
                        <ExternalLink size={15} />
                        Voir la demande
                    </button>
                )}
            </div>
        </div>
    );
}