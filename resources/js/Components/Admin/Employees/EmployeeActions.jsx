import { Link } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";

export default function EmployeeActions({ employee, onDelete }) {
    return (
        <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Link
                href={route("employees.edit", employee.id)}
                className="text-slate-300 hover:text-slate-600 transition-colors"
                aria-label={`Modifier ${employee.prenom}`}
            >
                <Pencil size={14} className="sm:w-4 sm:h-4" />
            </Link>

            <button
                type="button"
                onClick={() => onDelete(employee)}
                className="text-slate-300 hover:text-rose-500 transition-colors"
                aria-label={`Supprimer ${employee.prenom}`}
            >
                <Trash2 size={14} className="sm:w-4 sm:h-4" />
            </button>
        </div>
    );
}