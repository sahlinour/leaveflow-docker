import { Link } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";

export default function CongeActions({ conge, onDelete }) {
    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <Link
                href={route("conges.edit", conge.id)}
                className="text-slate-400 hover:text-slate-700"
            >
                <Pencil size={15} className="sm:w-[18px] sm:h-[18px]" />
            </Link>

            <button
                onClick={() => onDelete(conge)}
                className="text-slate-400 hover:text-red-500"
            >
                <Trash2 size={15} className="sm:w-[18px] sm:h-[18px]" />
            </button>
        </div>
    );
}