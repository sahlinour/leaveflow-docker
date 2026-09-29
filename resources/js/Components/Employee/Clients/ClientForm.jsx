import FormField from "./FormField";

const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 bg-white";

export default function ClientForm({
    data,
    setData,
    errors = {},
}) {
    const input = (
        name,
        type = "text",
        placeholder = ""
    ) => (
        <input
            type={type}
            value={data?.[name] ?? ""}
            onChange={(e) => setData(name, e.target.value)}
            placeholder={placeholder}
            className={inputClass}
        />
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Prénom */}
            <FormField
                label="Prénom"
                error={errors.prenom}
            >
                {input(
                    "prenom",
                    "text",
                    "Prénom"
                )}
            </FormField>

            {/* Nom */}
            <FormField
                label="Nom"
                error={errors.nom}
            >
                {input(
                    "nom",
                    "text",
                    "Nom"
                )}
            </FormField>

            {/* Téléphone */}
            <FormField
                label="Téléphone"
                error={errors.telephone}
            >
                {input(
                    "telephone",
                    "text",
                    "06 XX XX XX XX"
                )}
            </FormField>

            {/* Email */}
            <FormField
                label="Email"
                error={errors.email}
            >
                {input(
                    "email",
                    "email",
                    "nom@gmail.com"
                )}
            </FormField>

            {/* Adresse */}
            <div className="sm:col-span-2">
                <FormField
                    label="Adresse"
                    error={errors.adresse}
                >
                    <textarea
                        value={data?.adresse ?? ""}
                        onChange={(e) =>
                            setData(
                                "adresse",
                                e.target.value
                            )
                        }
                        rows={2}
                        placeholder="Adresse complète"
                        className={`${inputClass} resize-none`}
                    />
                </FormField>
            </div>

        </div>
    );
}
