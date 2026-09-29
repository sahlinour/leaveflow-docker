import React from "react";
import { User } from "lucide-react";

export default function AffectationEmployeeField({employes,value,onChange,disabled,error,}) 
{
    return (
        <div>
            <label
                htmlFor="user_id"
                className="mb-1.5 block text-xs font-medium text-slate-700 sm:mb-2 sm:text-sm"
            >
                Employé
            </label>

            <div className="relative">
                <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:h-[18px] sm:w-[18px]"
                />
                <select
                    id="user_id"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="
                        w-full rounded-lg border border-slate-200
                        bg-white py-2.5 pl-9 pr-3
                        text-xs text-slate-700
                        outline-none transition
                        focus:border-[#2F6690]
                        focus:ring-1 focus:ring-[#81C3D7]/40
                        sm:rounded-xl sm:py-3 sm:pl-10 sm:pr-4 sm:text-sm
                        disabled:cursor-not-allowed
                        disabled:bg-slate-100
                    "
                >
                    <option value="">
                        Sélectionner un employé
                    </option>

                    {employes.map((employe) => (
                        <option
                            key={employe.id}
                            value={employe.id}
                        >
                            {employe.prenom} {employe.nom}
                            {employe.matricule
                                ? ` - ${employe.matricule}`
                                : ""}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <p className="mt-1.5 text-xs text-[#D80536] sm:mt-2 sm:text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}