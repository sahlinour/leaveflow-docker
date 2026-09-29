import { useState } from "react";
import { router } from "@inertiajs/react";
import { X, FileText, CheckCircle2 } from "lucide-react";

const COLORS = {
    dark: "#16425B",
    mid: "#2F6690",
    light: "#3A7CA5",
    pale: "#81C3D7",
    bg: "#F4F7F9",
};

export default function GenerateBankDocument({ companyBank, onClose }) {
    const [montant, setMontant] = useState("");
    const [dateVirement, setDateVirement] = useState("");
    const [processing, setProcessing] = useState(false);
    const [saved, setSaved] = useState(false);

    const downloadDocument = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post(
            route("employe.bank-docs.store"),
            {
                company_bank_id: companyBank.id,
                montant: montant,
                date_virement: dateVirement,
            },
            {
                preserveScroll: true,

                onSuccess: (page) => {
                    const documentUrl = page.props.flash?.document_url;

                    setProcessing(false);
                    setSaved(true);

                    if (documentUrl) {
                        downloadDocument(documentUrl);
                    }
                    setTimeout(() => {
                        onClose();
                    }, 1200);
                },

                onError: () => {
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div>
                        <h2
                            className="text-lg font-semibold"
                            style={{ color: COLORS.dark }}
                        >
                            Enregistrer un document
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {companyBank.bank?.nom}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {saved ? (
                    /* Confirmation d'enregistrement */
                    <div className="flex flex-col items-center gap-3 p-10 text-center">
                        <div
                            className="flex h-14 w-14 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${COLORS.pale}33` }}
                        >
                            <CheckCircle2
                                className="h-8 w-8"
                                style={{ color: COLORS.mid }}
                            />
                        </div>

                        <p className="font-medium text-slate-700">
                            Document enregistré avec succès
                        </p>

                        <p className="text-sm text-slate-500">
                            Le téléchargement va démarrer automatiquement...
                        </p>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={submit} className="space-y-5 p-5">
                        {/* Banque */}
                        <div
                            className="rounded-xl p-4"
                            style={{ backgroundColor: COLORS.bg }}
                        >
                            <p className="text-xs text-slate-500">Banque</p>

                            <p className="mt-1 font-medium text-slate-700">
                                {companyBank.bank?.nom}
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                                Compte : {companyBank.numero_compte}
                            </p>
                        </div>

                        {/* Montant */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Montant
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={montant}
                                    onChange={(e) =>
                                        setMontant(e.target.value)
                                    }
                                    placeholder="Ex : 31225.40"
                                    required
                                    disabled={processing}
                                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-14 text-sm outline-none focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30 disabled:bg-slate-100"
                                />

                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                    MAD
                                </span>
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Date du virement
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                type="date"
                                value={dateVirement}
                                onChange={(e) =>
                                    setDateVirement(e.target.value)
                                }
                                required
                                disabled={processing}
                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30 disabled:bg-slate-100"
                            />
                        </div>

                        {/* Information */}
                        <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                            <p className="text-xs leading-5 text-blue-700">
                                Le montant en lettres sera généré
                                automatiquement dans le document Word. Une
                                fois enregistré, le téléchargement démarre
                                automatiquement.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={processing}
                                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                style={{ backgroundColor: COLORS.mid }}
                            >
                                <FileText className="h-4 w-4" />
                                {processing ? "Enregistrement..." : "Enregistrer"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}