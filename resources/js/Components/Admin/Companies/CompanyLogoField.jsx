export default function CompanyLogoField({
    company,
    value,
    error,
    onChange,
}) {
    return (
        <div>
            <label className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1.5">
                Logo de l'entreprise
            </label>

            {company?.logo && (
                <div className="mb-3">
                    <img
                        src={`/storage/${company.logo}`}
                        alt={company.nom}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-slate-200"
                    />
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files[0] || null)}
                className="w-full h-10 sm:h-11 rounded-lg border border-slate-300 bg-white px-2 text-[11px] sm:text-sm text-slate-500 cursor-pointer focus:outline-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 file:mr-2 sm:file:mr-3 file:h-7 sm:file:h-8 file:px-2 sm:file:px-3 file:rounded-md file:border-0 file:bg-slate-100 file:text-[10px] sm:file:text-xs file:font-medium file:text-slate-700 file:cursor-pointer hover:file:bg-slate-200"
            />

            {error && (
                <p className="text-red-500 text-[10px] sm:text-xs mt-1.5">
                    {error}
                </p>
            )}
        </div>
    );
}
