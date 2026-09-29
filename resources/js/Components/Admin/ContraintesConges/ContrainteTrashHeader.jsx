import { Link } from "@inertiajs/react";
import { COLORS } from "../../../theme";

export default function ContrainteTrashHeader({ count }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Corbeille</h1>
                <p className="text-sm text-slate-400">
                    {count} entreprise(s) supprimée(s)
                </p>
            </div>

            <Link
                href={route("companies.index")}
                className="px-4 py-2 rounded-lg text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORS.dark }}
            >
                Retour aux entreprises
            </Link>
        </div>
    );
}
