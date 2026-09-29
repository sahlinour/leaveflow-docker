import { Head } from "@inertiajs/react";
import { useState } from "react";
import LayoutEmploye from "../../../Layouts/Employeelayout";
import BankHeader from "../../../Components/Employee/BankDocs/BankHeader";
import { Building2, FileText, Landmark } from "lucide-react";
import GenerateBankDocument from "./generateBankDoc";

const COLORS = {
    dark: "#16425B",
    mid: "#2F6690",
    light: "#3A7CA5",
    pale: "#81C3D7",
    bg: "#F4F7F9",
};

export default function Index({ companyBanks = [] }) {
    const [selectedBank, setSelectedBank] = useState(null);

    return (
        <LayoutEmploye page="Bank Docs">
            <Head title="Documents bancaires" />

            <div className="space-y-6">
               <BankHeader />

                {companyBanks.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                        <div
                            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${COLORS.pale}33` }}
                        >
                            <Building2
                                className="h-7 w-7"
                                style={{ color: COLORS.mid }}
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-slate-700">
                            Aucune banque disponible
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Aucune configuration bancaire n'est disponible
                            pour votre entreprise.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left">
                                <thead
                                    className="border-b border-slate-200"
                                    style={{ backgroundColor: COLORS.bg }}
                                >
                                    <tr>
                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Banque
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            N° compte
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Ville
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {companyBanks.map((companyBank) => (
                                        <BankRow
                                            key={companyBank.id}
                                            companyBank={companyBank}
                                            onGenerate={setSelectedBank}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {selectedBank && (
                    <GenerateBankDocument
                        companyBank={selectedBank}
                        onClose={() => setSelectedBank(null)}
                    />
                )}
            </div>
        </LayoutEmploye>
    );
}

function BankRow({ companyBank, onGenerate }) {
    const bankName = companyBank.bank?.nom || "Banque non renseignée";
    const accountNumber = companyBank.numero_compte || "Non renseigné";
    const city = companyBank.ville || "-";

    return (
        <tr className="transition hover:bg-slate-50">
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${COLORS.pale}26` }}
                    >
                        <Building2
                            className="h-4 w-4"
                            style={{ color: COLORS.mid }}
                        />
                    </div>

                    <span className="font-medium text-slate-800">
                        {bankName}
                    </span>
                </div>
            </td>

            <td className="px-5 py-4">
                <span className="text-sm text-slate-700">
                    {accountNumber}
                </span>
            </td>

            <td className="px-5 py-4">
                <span className="text-sm text-slate-700">{city}</span>
            </td>

            <td className="px-5 py-4">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => onGenerate(companyBank)}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
                        style={{ backgroundColor: COLORS.mid }}
                    >
                        <FileText className="h-4 w-4" />
                        Generer
                    </button>
                </div>
            </td>
        </tr>
    );
}