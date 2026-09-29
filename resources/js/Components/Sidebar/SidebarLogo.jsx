import React from "react";
import { COLORS } from "../../theme";

export default function SidebarLogo({collapsed,onToggle,}) 
{
    return (
        <button
            onClick={onToggle}
            className="h-16 flex items-center px-5 border-b border-slate-200 shrink-0 "
        >
            <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                style={{backgroundColor: COLORS.dark,}}
            >
                LF
            </div>

            {!collapsed && (
                <span className="ml-3 font-bold text-slate-800 text-lg whitespace-nowrap">
                    LeaveFlow
                </span>
            )}
        </button>
    );
}