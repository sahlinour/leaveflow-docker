import { router } from "@inertiajs/react";

import LayoutAdmin from "../../../Layouts/LayoutAdmin";

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
        router.put(route("notifications.readAll"), {}, {
            preserveScroll: true,
        });
    };
    const handleView = (notification) => {
        const goToDemande = () => {
            router.get(route("admin.demandes-conges.index"), {
                demande_id: notification.data?.demande_id,
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
        <LayoutAdmin page="Notifications">
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
        </LayoutAdmin>
    );
}