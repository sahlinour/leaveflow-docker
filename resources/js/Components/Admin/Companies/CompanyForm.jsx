import { Link } from "@inertiajs/react";
import { COLORS } from "../../../theme";
import CompanyLogoField from "./CompanyLogoField";

const inputClass =
    "w-full h-10 sm:h-11 rounded-lg border border-slate-300 px-3 sm:px-4 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20";

const textareaClass =
    "w-full min-h-[110px] sm:min-h-[130px] rounded-lg border border-slate-300 px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20";

export default function CompanyForm({
    data,
    setData,
    errors,
    processing,
    handleSubmit,
    edit = false,
    company = null,
}) {
    const update = (field, value) => setData(field, value);

    return (
        <form
            onSubmit={handleSubmit}
            className="flex-1 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 w-full"
        >
            <div className="space-y-5 sm:space-y-6">
                <Field label="Nom de l'entreprise" error={errors.nom}>
                    <input
                        type="text"
                        value={data.nom}
                        onChange={(e) => update("nom", e.target.value)}
                        placeholder="Nom de l'entreprise"
                        className={inputClass}
                    />
                </Field>

                <Field label="Adresse" error={errors.adresse}>
                    <textarea
                        rows={5}
                        value={data.adresse}
                        onChange={(e) => update("adresse", e.target.value)}
                        placeholder="Adresse de l'entreprise"
                        className={textareaClass}
                    />
                </Field>

                <CompanyLogoField
                    company={company}
                    value={data.logo}
                    error={errors.logo}
                    onChange={(file) => update("logo", file)}
                />
                <div>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <label className="block text-[11px] sm:text-sm font-medium text-slate-700">
                                Bureau de change
                            </label>

                            <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
                                Active les fonctionnalités spécifiques aux bureaux de change.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                update("type", data.type ? null : true)
                            }
                            className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]/30 ${
                                data.type
                                    ? "bg-[#3A7CA5]"
                                    : "bg-slate-300"
                            }`}
                            aria-pressed={!!data.type}
                        >
                            <span
                                className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                                    data.type
                                        ? "translate-x-6 sm:translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>

                    {errors.type && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1.5">
                            {errors.type}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-sm font-medium text-white disabled:opacity-60"
                        style={{ backgroundColor: COLORS.dark }}
                    >
                        {processing
                            ? "Enregistrement..."
                            : edit
                            ? "Enregistrer les modifications"
                            : "Enregistrer l'entreprise"}
                    </button>

                    <Link
                        href={route("companies.index")}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-slate-300 text-[11px] sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Annuler
                    </Link>
                </div>
            </div>
        </form>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1.5">
                {label}
            </label>

            {children}

            {error && (
                <p className="text-red-500 text-[10px] sm:text-xs mt-1.5">
                    {error}
                </p>
            )}
        </div>
    );
}
