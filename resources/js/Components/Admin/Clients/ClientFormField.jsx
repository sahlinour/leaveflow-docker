export default function ClientFormField({
    label,icon: Icon,value,onChange,error,type = "text",placeholder = "",textarea = false,rows = 3,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <Icon
                        size={18}
                        className={`absolute left-3 text-slate-400 ${
                            textarea
                                ? "top-3"
                                : "top-1/2 -translate-y-1/2"
                        }`}
                    />
                )}

                {textarea ? (
                    <textarea
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2F6690] focus:border-transparent"
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6690] focus:border-transparent"
                    />
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}