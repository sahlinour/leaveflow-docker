import React from "react";
import { Link } from "@inertiajs/react";
import { User, LogOut } from "lucide-react";

export default function ProfileDropdown({ onClose }) {
    return (
        <div className="absolute right-0 z-50 mt-3 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-slate-100"
            >
                <User size={16} />
                <span>Profile</span>
            </Link>

            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
            >
                <LogOut size={16} />
                <span>Logout</span>
            </Link>
        </div>
    );
}