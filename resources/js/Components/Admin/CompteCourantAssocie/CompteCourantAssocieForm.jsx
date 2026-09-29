import React from "react";
import { Link, useForm } from "@inertiajs/react";

export default function CompteCourantAssocieForm({
    employees = [],
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        user_id: "",
        montant: "",
        date_affectation: new Date()
            .toISOString()
            .split("T")[0],
        commentaire: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.compte-courant-associe.store"));
    };

    return (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <form onSubmit={submit} className="space-y-5">

                {/* Employé */}
                <div>
                    <label
                        htmlFor="user_id"
                        className="mb-2 block text-xs font-medium text-slate-700 sm:text-sm"
                    >
                        Employé
                    </label>

                    <select
                        id="user_id"
                        value={data.user_id}
                        onChange={(e) =>
                            setData("user_id", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:text-sm"
                    >
                        <option value="">
                            Sélectionner un employé
                        </option>

                        {employees.map((employee) => (
                            <option
                                key={employee.id}
                                value={employee.id}
                            >
                                {employee.prenom} {employee.nom}
                            </option>
                        ))}
                    </select>

                    {errors.user_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.user_id}
                        </p>
                    )}
                </div>

                {/* Montant */}
                <div>
                    <label
                        htmlFor="montant"
                        className="mb-2 block text-xs font-medium text-slate-700 sm:text-sm"
                    >
                        Montant
                    </label>

                    <div className="relative">
                        <input
                            id="montant"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={data.montant}
                            onChange={(e) =>
                                setData("montant", e.target.value)
                            }
                            placeholder="Ex. 200000"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 pr-12 text-xs text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:text-sm"
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                            DH
                        </span>
                    </div>

                    {errors.montant && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.montant}
                        </p>
                    )}
                </div>

                {/* Date */}
                <div>
                    <label
                        htmlFor="date_affectation"
                        className="mb-2 block text-xs font-medium text-slate-700 sm:text-sm"
                    >
                        Date d'affectation
                    </label>

                    <input
                        id="date_affectation"
                        type="date"
                        value={data.date_affectation}
                        onChange={(e) =>
                            setData(
                                "date_affectation",
                                e.target.value
                            )
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:text-sm"
                    />

                    {errors.date_affectation && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.date_affectation}
                        </p>
                    )}
                </div>

                {/* Commentaire */}
                <div>
                    <label
                        htmlFor="commentaire"
                        className="mb-2 block text-xs font-medium text-slate-700 sm:text-sm"
                    >
                        Commentaire
                        <span className="ml-1 font-normal text-slate-400">
                            (facultatif)
                        </span>
                    </label>

                    <textarea
                        id="commentaire"
                        rows="4"
                        value={data.commentaire}
                        onChange={(e) =>
                            setData(
                                "commentaire",
                                e.target.value
                            )
                        }
                        placeholder="Ajouter un commentaire..."
                        className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-1 focus:ring-[#2F6690] sm:text-sm"
                    />

                    {errors.commentaire && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.commentaire}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                    <Link
                        href={route(
                            "admin.compte-courant-associe.index"
                        )}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:text-sm"
                    >
                        Annuler
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[#2F6690] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#16425B] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    >
                        {processing
                            ? "Affectation..."
                            : "Affecter le montant"}
                    </button>
                </div>
            </form>
        </div>
    );
}