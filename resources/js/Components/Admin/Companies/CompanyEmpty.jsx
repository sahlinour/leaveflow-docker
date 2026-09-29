import { Link } from "@inertiajs/react";
import { COLORS } from "../../../theme";

export default function CompanyEmpty() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <p className="text-slate-500 text-sm">
                Aucune entreprise enregistrée.
            </p>

            <Link
                href={route("companies.create")}
                className="text-sm font-medium mt-2 inline-block"
                style={{ color: COLORS.mid }}
            >
                Ajouter votre première entreprise
            </Link>
        </div>
    );
}
