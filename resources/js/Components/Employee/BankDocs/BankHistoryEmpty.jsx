import React from "react";
import { FileText } from "lucide-react";

const COLORS = {
    mid: "#2F6690",
    pale: "#81C3D7",
};

export default function BankHistoryEmpty() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:rounded-2xl sm:p-10">
            <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
                style={{
                    backgroundColor: `${COLORS.pale}33`,
                }}
            >
                <FileText
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    style={{ color: COLORS.mid }}
                />
            </div>

            <h2 className="mt-3 text-base font-semibold text-slate-700 sm:mt-4 sm:text-lg">
                Aucun document généré
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Vous n'avez encore généré aucun document bancaire.
            </p>
        </div>
    );
}
