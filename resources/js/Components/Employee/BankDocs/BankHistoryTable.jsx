import React from "react";
import BankHistoryRow from "./BankHistoryRow";

const COLORS = {
    bg: "#F4F7F9",
};

export default function BankHistoryTable({ documents = [] }) {
    return (
        <div
            className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl"
        >
            <table
                className="w-full min-w-[760px] table-fixed text-left sm:min-w-[850px]"
            >
                <thead
                    className="border-b border-slate-200"
                    style={{
                        backgroundColor: COLORS.bg,
                    }}
                >
                    <tr>

                        <th
                            className="w-[20%] px-2 py-2 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-4"
                        >
                            Référence
                        </th>

                        <th
                            className="w-[20%] px-2 py-2 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-4"
                        >
                            Banque
                        </th>

                        <th
                            className="w-[15%] px-2 py-2 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-4"
                        >
                            Montant
                        </th>
                        <th
                            className="w-[15%] px-2 py-2 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-4"
                        >
                            Virement
                        </th>
                        <th
                            className="w-[15%] px-2 py-2 text-left text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-4"
                        >
                            Génération
                        </th>

                        <th
                            className="w-[15%] px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:px-3 sm:py-3 sm:text-xs md:px-4 md:py-4"
                        >
                            Action
                        </th>

                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {documents.data.map((document) => (
                        <BankHistoryRow
                            key={document.id}
                            document={document}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
