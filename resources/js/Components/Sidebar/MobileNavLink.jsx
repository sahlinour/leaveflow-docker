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

export default function MobileNavLink({item,isActive,badge,}) 
{
    const Icon = ICONS[item.icon];
    return (
        <Link
            href={item.href}
            className="relative flex flex-col items-center justify-center gap-1 py-2.5 px-4 min-w-[72px] shrink-0"
        >
            <span className="relative">
                {Icon && (
                    <Icon
                        size={20}
                        strokeWidth={
                            isActive ? 2.4 : 2
                        }
                        style={{color: isActive ? COLORS.dark : "#94A3B8",}}
                    />
                )}

                {badge && (
                    <span className="absolute -top-1.5 -right-2 text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center text-white"
                        style={{backgroundColor: COLORS.light,}}
                    >
                        {badge}
                    </span>
                )}
            </span>

            <span
                className="text-[11px] font-medium whitespace-nowrap"
                style={{color: isActive ? COLORS.dark : "#94A3B8",}}
            >
                {item.label}
            </span>

            {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full"
                    style={{backgroundColor: COLORS.dark,}}
                />
            )}
        </Link>
    );
}