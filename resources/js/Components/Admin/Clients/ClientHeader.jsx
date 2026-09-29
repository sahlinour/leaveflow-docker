import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { COLORS } from "../../../theme";

export default function ClientHeader({ total }) {
    return (
         <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl md:text-2xl">
                    Gestion des clients
                </h1>

                <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                    {total} client{total !== 1 ? "s" : ""} enregistré
                    {total !== 1 ? "s" : ""}
                </p>
            </div>

            <Link
                href={route("clients.create")}
                className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-medium text-white rounded-lg px-2.5 sm:px-4 py-2 sm:py-2.5 hover:opacity-90 transition"
                style={{backgroundColor: COLORS.dark,}}
                >
                <Plus size={13} className="sm:w-4 sm:h-4" />
                Ajouter un client
            </Link>
        </div>
    );
}
