export default function BankFormField({
    label,name,value,onChange,options = null,required = false,
}) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            {options ? (
                <select
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    required={required}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30"
                >
                    <option value="">
                        Sélectionner
                    </option>

                    {options.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.nom}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    required={required}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#2F6690] focus:ring-2 focus:ring-[#81C3D7]/30"
                />
            )}
        </div>
    );
}