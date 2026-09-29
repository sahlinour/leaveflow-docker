import React from "react";
import { Link } from "@inertiajs/react";
import { COLORS } from "../../theme";

import {
    LayoutDashboard,
    Building2,
    Users,
    FileText,
    Calendar,
    Clock,
    TrendingUp,
    Bell,
    Plus,
    UserRound,
    Landmark,
    Wallet,
    ReceiptText,
    WalletCards
} from "lucide-react";

const ICONS = {
    LayoutDashboard,
    Building2,
    Users,
    FileText,
    Calendar,
    Clock,
    TrendingUp,
    Bell,
    Plus,
    UserRound,
    Landmark,
    Wallet,
    ReceiptText,
    WalletCards
};

export default function DesktopNavLink({
    item,
    isActive,
    badge,
    collapsed,
}) {
    const Icon = ICONS[item.icon];

    return (
        <Link
            href={item.href}
            title={collapsed ? item.label : ""}
            className={`
                flex items-center gap-3
                px-3 py-3 rounded-lg
                transition-colors
                ${collapsed ? "justify-center" : ""}
                ${
                    isActive
                        ? "text-white"
                        : "text-slate-700 hover:bg-slate-100"
                }
            `}
            style={
                isActive
                    ? { backgroundColor: COLORS.dark }
                    : {}
            }
        >
            {Icon && (
                <Icon
                    size={18}
                    className="shrink-0"
                />
            )}

            {!collapsed && (
                <span className="whitespace-nowrap">
                    {item.label}
                </span>
            )}

            {!collapsed && badge && (
                <span
                    className="
                        ml-auto
                        text-xs font-semibold
                        rounded-full
                        h-5 min-w-5 px-1.5
                        flex items-center justify-center
                        text-white
                    "
                    style={{
                        backgroundColor: isActive
                            ? "rgba(255,255,255,0.25)"
                            : COLORS.light,
                    }}
                >
                    {badge}
                </span>
            )}
        </Link>
    );
}