import { Link } from "@inertiajs/react";
import { Plus} from "lucide-react";
import { COLORS } from "../../../theme";

export default function ClientHeader({ total = 0 }) {
    return (
         <div className="mb-6 flex items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
               <div className="flex items-center gap-2">
                   <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
                        Mes clients
                    </h1>
                </div>

                <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px] md:text-xs lg:text-sm">
                    Gérez les clients de votre entreprise.
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                    {total} client{total > 1 ? "s" : ""}
                </p>
            </div>

            <Link
                href={route("employe.clients.create")}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-medium text-white transition hover:opacity-90 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs md:px-4 md:py-2.5 md:text-sm"
                style={{ backgroundColor: COLORS.dark }}
            >
                <Plus size={16} />

                <span>Nouveau client</span>
            </Link>
        </div>
    );
}