import { Bell } from "lucide-react";

export default function NotificationEmpty() {
    return (
        <div className="py-12 sm:py-16 text-center">
            <Bell
                size={40}
                className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-sm sm:text-base font-semibold text-slate-700">
                Aucune notification
            </h3>

            <p className="text-[11px] sm:text-sm text-slate-500 mt-1">
                Vous n'avez aucune notification pour le moment.
            </p>
        </div>
    );
}