import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white";

export default function ProfessionalStep({
    data,
    setData,
    errors,
}) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Field label="Poste" error={errors.poste}>
                    <input
                        value={data.poste}
                        onChange={(e) =>
                            setData("poste", e.target.value)
                        }
                        placeholder="Développeur Full-Stack"
                        className={inputClass}
                    />
                </Field>

                <Field
                    label="Date d'embauche"
                    error={errors.date_embauche}
                >
                    <input
                        type="date"
                        value={data.date_embauche}
                        onChange={(e) =>
                            setData(
                                "date_embauche",
                                e.target.value
                            )
                        }
                        className={inputClass}
                    />
                </Field>
            </div>

            <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                    Sécurité du compte
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="Mot de passe"
                        error={errors.password}
                    >
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="8 caractères minimum"
                            className={inputClass}
                        />
                    </Field>

                    <Field
                        label="Confirmer le mot de passe"
                        error={errors.password_confirmation}
                    >
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
                            placeholder="••••••••"
                            className={inputClass}
                        />
                    </Field>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                    Votre matricule, votre rôle et votre entreprise
                    seront attribués automatiquement après votre
                    inscription.
                </p>
            </div>
        </div>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <InputLabel value={label} />

            {children}

            <InputError message={error} />
        </div>
    );
}