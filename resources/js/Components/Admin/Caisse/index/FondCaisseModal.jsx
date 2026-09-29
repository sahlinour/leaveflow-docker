import React from "react";
import { useForm } from "@inertiajs/react";
import {
    X,
    Wallet,
    Save,
} from "lucide-react";

export default function FondCaisseModal({
    caisse,
    onClose,
}) {
    const form = useForm({
        user_id: caisse.user_id,
        date_caisse: caisse.date_caisse,
        fond_caisse: caisse.fond_caisse ?? "",
    });

    const employe = caisse.user;

    const submit = (e) => {
        e.preventDefault();

        form.post(
            route("admin.caisse.affecter"),
            {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                            style={{
                                backgroundColor: "#E8F3F7",
                                color: "#2F6690",
                            }}
                        >
                            <Wallet size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-white">
                                Fond de caisse
                            </h2>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {employe?.prenom}{" "}
                                {employe?.nom}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5 p-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Date
                        </label>

                        <input
                            type="date"
                            value={form.data.date_caisse}
                            readOnly
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Fond de caisse
                        </label>

                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.data.fond_caisse}
                                onChange={(e) =>
                                    form.setData(
                                        "fond_caisse",
                                        e.target.value
                                    )
                                }
                                placeholder="Ex : 5000"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-sm text-slate-900 outline-none transition focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            />

                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                                DH
                            </span>
                        </div>

                        {form.errors.fond_caisse && (
                            <p className="mt-2 text-sm text-[#D80536]">
                                {form.errors.fond_caisse}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            style={{
                                backgroundColor: "#2F6690",
                            }}
                        >
                            <Save size={17} />

                            {form.processing
                                ? "Enregistrement..."
                                : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
