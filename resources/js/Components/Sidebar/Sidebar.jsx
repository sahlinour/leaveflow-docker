import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { navItems as adminNavItems } from "./../../theme";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";
import MobileNavLink from "./MobileNavLink";
import { getActiveHref, getBadge, getVisibleItems } from "./sidebarUtils";

const ASIDE_CLASSES = (collapsed) => `
    hidden md:flex sticky top-0 left-0 h-screen
    bg-white border-r border-slate-200 flex-col overflow-hidden
    transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}
`;

const MOBILE_NAV_CLASSES = `
    md:hidden fixed bottom-0 left-0 right-0 z-50
    bg-white border-t border-slate-200
    pb-[env(safe-area-inset-bottom)]
`;

export default function Sidebar({
    items = adminNavItems,
    showRoleSwitch = true,
    user = {
        name: "Super Admin",
        email: "admin@leaveflow.com",
        initials: "SA",
    },
}) {
    const [collapsed, setCollapsed] = useState(false);
    const { url, props } = usePage();
    const authUser = props.auth?.user;
    const { pendingRequests = 0, unreadNotificationsCount = 0 } = props;

    const visibleItems = getVisibleItems(items, authUser);
    const activeHref = getActiveHref(visibleItems, url);

    return (
        <>
            <aside className={ASIDE_CLASSES(collapsed)}>
                <SidebarLogo
                    collapsed={collapsed}
                    onToggle={() => setCollapsed(!collapsed)}
                />

                <SidebarMenu
                    items={visibleItems}
                    activeHref={activeHref}
                    collapsed={collapsed}
                    pendingRequests={pendingRequests}
                    unreadNotificationsCount={unreadNotificationsCount}
                />

                <SidebarFooter user={user} collapsed={collapsed} />
            </aside>

            <nav className={MOBILE_NAV_CLASSES}>
                <div className="flex overflow-x-auto no-scrollbar">
                    {visibleItems.map((item) => (
                        <MobileNavLink
                            key={item.label}
                            item={item}
                            isActive={item.href === activeHref}
                            badge={getBadge(
                                item,
                                pendingRequests,
                                unreadNotificationsCount
                            )}
                        />
                    ))}
                </div>
            </nav>
        </>
    );
}