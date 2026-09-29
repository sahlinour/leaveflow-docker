import React from "react";
import DesktopNavLink from "./DesktopNavLink";
import { getBadge } from "./sidebarUtils";

const NAV_CLASSES = `
    flex-1 min-h-0 overflow-y-auto p-4
    [scrollbar-width:thin]
    [scrollbar-color:transparent_transparent]
    hover:[scrollbar-color:#CBD5E1_transparent]
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-transparent
    hover:[&::-webkit-scrollbar-thumb]:bg-slate-300
`;

export default function SidebarMenu({
    items,
    activeHref,
    collapsed,
    pendingRequests,
    unreadNotificationsCount,
}) {
    return (
        <nav className={NAV_CLASSES}>
            {!collapsed && (
                <p className="text-xs uppercase text-slate-400 mb-3 tracking-wider">
                    Menu
                </p>
            )}

            <div className="space-y-2">
                {items.map((item) => (
                    <DesktopNavLink
                        key={item.label}
                        item={item}
                        isActive={item.href === activeHref}
                        badge={getBadge(
                            item,
                            pendingRequests,
                            unreadNotificationsCount
                        )}
                        collapsed={collapsed}
                    />
                ))}
            </div>
        </nav>
    );
}