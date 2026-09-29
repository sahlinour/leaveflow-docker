import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Save } from "lucide-react";

export default function AffectationFormActions({
    processing,
    isEdit,
}) {
    return (
        <div
            className="
                flex flex-col-reverse gap-2.5
                border-t border-slate-200
                px-3 py-4

                sm:flex-row sm:justify-end
                sm:gap-3 sm:px-5 sm:py-4

                md:px-6 md:py-5
            "
        >
            <Link
                href={route("admin.caisse.index")}
                className="
                    inline-flex items-center justify-center gap-1.5
                    rounded-lg border border-slate-200
                    px-4 py-2.5
                    text-xs font-semibold text-slate-600
                    transition hover:bg-slate-50

                    sm:gap-2 sm:rounded-xl
                    sm:px-5 sm:py-3 sm:text-sm
                "
            >
                <ArrowLeft
                    size={15}
                    className="sm:h-[17px] sm:w-[17px]"
                />

                Annuler
            </Link>

            <button
                type="submit"
                disabled={processing}
                className="
                    inline-flex items-center justify-center gap-1.5
                    rounded-lg
                    px-4 py-2.5
                    text-xs font-semibold text-white
                    transition hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    sm:gap-2 sm:rounded-xl
                    sm:px-5 sm:py-3 sm:text-sm
                "
                style={{
                    backgroundColor: "#2F6690",
                }}
            >
                <Save
                    size={15}
                    className="sm:h-[17px] sm:w-[17px]"
                />

                {processing
                    ? "Enregistrement..."
                    : isEdit
                        ? "Modifier le fond de caisse"
                        : "Affecter le fond de caisse"}
            </button>
        </div>
    );
}