import React from "react";
import { Link } from "@inertiajs/react";
import { WalletCards } from "lucide-react";

export default function DetteFormActions({ processing }) {
    return (
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
                href={route("employe.dettes.index")}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto"
            >
                Annuler
            </Link>
            <button
                type="submit"
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                style={{ backgroundColor: "#2F6690" }}
            >
                <WalletCards size={18} />
                {processing ? "Enregistrement..." : "Enregistrer les dettes"}
            </button>
        </div>
    );
}   