import { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { COLORS } from "../../../theme";
import CongeFormField from "./CongeFormField";

const inputClass =
    "w-full h-10 sm:h-11 border border-slate-200 rounded-lg px-3 sm:px-4 py-2 text-[11px] sm:text-sm text-slate-700 outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white";

export default function CongeForm({data,setData,errors,processing,onSubmit,employees = [],companies = [],annees = [],edit = false,employeeName = "",}) 
{
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const filteredEmployees = useMemo(() => {
        if (!selectedCompanyId) {
            return [];
        }

        return employees.filter(
            (employee) =>
                employee.company_id === selectedCompanyId
        );
    }, [employees, selectedCompanyId]);

    return (
        <form
            onSubmit={onSubmit}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-5 sm:space-y-6"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                {/* ENTREPRISE */}
                {!edit && (
                    <CongeFormField label="Entreprise">
                        <select
                            value={selectedCompanyId}
                            onChange={(e) => {
                                setSelectedCompanyId(e.target.value);
                                setData("user_id", "");
                            }}
                            className={inputClass}
                        >
                            <option value="">
                                Sélectionner une entreprise
                            </option>

                            {companies.map((company) => (
                                <option
                                    key={company.id}
                                    value={company.id}
                                >
                                    {company.nom}
                                </option>
                            ))}
                        </select>
                    </CongeFormField>
                )}

                {/* EMPLOYÉ */}
                <CongeFormField
                    label="Employé"
                    error={errors.user_id}
                >
                    {edit ? (
                        <input
                            type="text"
                            value={employeeName}
                            readOnly
                            className={`${inputClass} bg-slate-100 cursor-not-allowed`}
                        />
                    ) : (
                        <select
                            value={data.user_id}
                            onChange={(e) =>
                                setData("user_id", e.target.value)
                            }
                            disabled={!selectedCompanyId}
                            className={`${inputClass} ${
                                !selectedCompanyId
                                    ? "bg-slate-100 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <option value="">
                                {!selectedCompanyId
                                    ? "Sélectionner d'abord une entreprise"
                                    : filteredEmployees.length === 0
                                        ? "Aucun employé dans cette entreprise"
                                        : "Sélectionner un employé"}
                            </option>

                            {filteredEmployees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.prenom} {employee.nom}
                                </option>
                            ))}
                        </select>
                    )}
                </CongeFormField>

                {/* ANNÉE */}
                <CongeFormField
                    label="Année"
                    error={errors.annee}
                >
                    {edit ? (
                        <input
                            type="number"
                            value={data.annee}
                            onChange={(e) =>
                                setData("annee", e.target.value)
                            }
                            className={inputClass}
                        />
                    ) : (
                        <select
                            value={data.annee}
                            onChange={(e) =>
                                setData("annee", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="">
                                Sélectionner une année
                            </option>

                            {annees.map((annee) => (
                                <option
                                    key={annee}
                                    value={annee}
                                >
                                    {annee}
                                </option>
                            ))}
                        </select>
                    )}
                </CongeFormField>

                {/* SOLDE INITIAL */}
                <CongeFormField
                    label="Solde initial (jours)"
                    error={errors.solde_initial}
                >
                    <input
                        type="number"
                        min="0"
                        value={data.solde_initial}
                        onChange={(e) =>
                            setData(
                                "solde_initial",
                                e.target.value
                            )
                        }
                        placeholder="Ex : 22"
                        className={inputClass}
                    />
                </CongeFormField>

                {/* SOLDE UTILISÉ */}
                <CongeFormField
                    label="Solde utilisé (jours)"
                    error={errors.jours_utilise}
                >
                    <input
                        type="number"
                        min="0"
                        value={data.jours_utilise}
                        onChange={(e) =>
                            setData(
                                "jours_utilise",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    />
                </CongeFormField>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 border-t border-slate-100">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto text-[11px] sm:text-sm font-medium text-white rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 disabled:opacity-60"
                    style={{
                        backgroundColor: COLORS.dark,
                    }}
                >
                    {processing
                        ? "Enregistrement..."
                        : edit
                            ? "Mettre à jour le solde"
                            : "Ajouter le solde"}
                </button>

                <Link
                    href={route("conges.index")}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-slate-300 text-[11px] sm:text-sm font-medium text-slate-700 hover:bg-slate-50 text-center"
                >
                    Annuler
                </Link>
            </div>
        </form>
    );
}
