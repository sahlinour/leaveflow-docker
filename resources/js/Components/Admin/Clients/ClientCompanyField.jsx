import { Building2 } from "lucide-react";

export default function ClientCompanyField({value,onChange,companies = [],error,}) 
{
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                Entreprise <span className="text-red-500">*</span>
            </label>

            <div className="relative">
                <Building2
                    size={18}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <select
                    value={value}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6690] focus:border-transparent bg-white"
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
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}