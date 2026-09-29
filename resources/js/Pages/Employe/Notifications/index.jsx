import { router } from "@inertiajs/react";

import LayoutEmploye from "../../../Layouts/Employeelayout";

import NotificationHeader from "@/Components/Notifications/NotificationHeader";
import NotificationItem from "@/Components/Notifications/NotificationItem";
import NotificationEmpty from "@/Components/Notifications/NotificationEmpty";
import Pagination from "@/Components/Common/Pagination";

export default function Index({
    notifications = {},
    unreadNotificationsCount = 0,
}) {
    const notificationData = notifications.data ?? [];

    const handleReadAll = () => {
        router.put(
            route("notifications.readAll"),
            {},
            {
                preserveScroll: true,
            }
        );
    };
    const handleView = (notification) => {
        const demandeId = notification.data?.demande_id;

        if (!demandeId) return;

        const goToDemande = () => {
            router.get(route("demandes-conges.index"), {
                demande_id: demandeId,
            });
        };

        if (!notification.read_at) {
            router.put(
                route("notifications.read", notification.id),
                {},
                {
                    preserveScroll: true,
                    onSuccess: goToDemande,
                }
            );
        } else {
            goToDemande();
        }
    };

    return (
        <LayoutEmploye page="Notifications">
            <div className="space-y-5 sm:space-y-6">

                <NotificationHeader
                    unreadNotificationsCount={unreadNotificationsCount}
                    onReadAll={handleReadAll}
                />

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

                    {notificationData.length === 0 ? (
                        <NotificationEmpty />
                    ) : (
                        <>
                            {notificationData.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onView={handleView}
                                />
                            ))}

                            <Pagination
                                links={notifications.links ?? []}
                            />
                        </>
                    )}

                </div>

            </div>
        </LayoutEmploye>
    );
}