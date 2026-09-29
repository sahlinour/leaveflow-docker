import React from "react";
import { Download, Landmark } from "lucide-react";

const COLORS = {
    mid: "#2F6690",
    pale: "#81C3D7",
};

export default function BankHistoryRow({ document }) {
    const bankName =
        document.company_bank?.bank?.nom ||
        "Banque non renseignée";
    const amount = Number(document.montant || 0).toLocaleString(
        "fr-FR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    );
    const dateVirement = document.date_virement
        ? new Date(document.date_virement).toLocaleDateString("fr-FR")
        : "-";
    const dateGeneration = document.created_at
        ? new Date(document.created_at).toLocaleDateString("fr-FR")
        : "-";

    return (
        <tr className="transition hover:bg-slate-50">
            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
                <span
                    title={document.reference}
                    className="block max-w-[130px] truncate text-[9px] font-medium text-slate-800 sm:max-w-[170px] sm:text-xs md:max-w-[220px] md:text-sm"
                >
                    {document.reference}
                </span>

            </td>

            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5 md:gap-3">
                    <span
                        title={bankName}
                        className="block truncate text-[9px] font-medium text-slate-700 sm:text-xs md:text-sm"
                    >
                        {bankName}
                    </span>

                </div>

            </td>

            <td className="whitespace-nowrap px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
                <span
                    className="text-[9px] font-semibold text-slate-700 sm:text-xs md:text-sm"
                >
                    {amount} DH
                </span>

            </td>

            <td className="whitespace-nowrap px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
                <span
                    className="text-[9px] text-slate-600 sm:text-xs md:text-sm"
                >
                    {dateVirement}
                </span>

            </td>

            <td className="whitespace-nowrap px-2 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
                <span
                    className="text-[9px] text-slate-600 sm:text-xs md:text-sm"
                >
                    {dateGeneration}
                </span>

            </td>

            <td className="px-2 py-2 text-center sm:px-3 sm:py-3 md:px-4 md:py-4">
                <div className="flex justify-center">
                    <a
                        href={`/storage/${document.document_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Télécharger"
                        aria-label="Télécharger le document"
                        className="inline-flex items-center justify-center gap-1.5 rounded-md px-1.5 py-1.5 text-[9px] font-medium text-white transition hover:opacity-90 sm:rounded-lg sm:px-2.5 sm:py-2 sm:text-xs md:px-3 md:py-2"
                        style={{
                            backgroundColor: COLORS.mid,
                        }}
                    >
                        <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">
                            Télécharger
                        </span>
                    </a>
                </div>
            </td>
        </tr>
    );
}
