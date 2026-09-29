import React from "react";
import { ChevronDown } from "lucide-react";
import { COLORS } from "@/theme";

export default function ProfileButton({user,onClick,}) 
{
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2"
        >
            <div
                className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    font-semibold text-white
                "
                style={{
                    backgroundColor: COLORS.mid,
                }}
            >
                {user.initials}
            </div>

            <span className="hidden font-medium text-slate-800 sm:block">
                {user.name}
            </span>

            <ChevronDown
                size={15}
                className="text-slate-500"
            />
        </button>
    );
}