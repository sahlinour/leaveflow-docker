import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

import NotificationButton from "./NotificationButton";
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileButton from "./ProfileButton";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar({
    page = "Dashboard",
    user = {
        name: "Admin",
        initials: "SA",
    },
}) {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const {
        notifications = [],
        unreadNotificationsCount = 0,
    } = usePage().props;

    const handleNotificationToggle = () => {
        setNotificationsOpen((previous) => !previous);
        setProfileOpen(false);
    };

    const handleProfileToggle = () => {
        setProfileOpen((previous) => !previous);
        setNotificationsOpen(false);
    };

    const handleRead = (id) => {
        router.put(
            route("notifications.read", id),
            {},
            {
                onSuccess: () => {
                    router.visit(
                        route("admin.notifications.index")
                    );
                },
            }
        );
    };

    const handleReadAll = () => {
        router.put(
            route("notifications.readAll")
        );
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 text-sm">
                <span className="font-semibold text-slate-800">
                    LeaveFlow
                </span>

                <span className="text-slate-400">
                    /
                </span>

                <span className="truncate text-slate-500">
                    {page}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <NotificationButton
                        unreadCount={
                            unreadNotificationsCount
                        }
                        onClick={
                            handleNotificationToggle
                        }
                    />

                    {notificationsOpen && (
                        <NotificationsDropdown
                            notifications={notifications}
                            unreadCount={
                                unreadNotificationsCount
                            }
                            onRead={handleRead}
                            onReadAll={handleReadAll}
                            onClose={() =>
                                setNotificationsOpen(false)
                            }
                        />
                    )}
                </div>

                <div className="relative">
                    <ProfileButton
                        user={user}
                        onClick={handleProfileToggle}
                    />

                    {profileOpen && (
                        <ProfileDropdown
                            onClose={() =>
                                setProfileOpen(false)
                            }
                        />
                    )}
                </div>
            </div>
        </header>
    );
}