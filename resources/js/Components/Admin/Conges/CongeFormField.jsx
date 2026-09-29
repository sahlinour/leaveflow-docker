export default function CongeFormField({ label, error, children }) {
    return (
        <div className="w-full">
            <label className="block text-[11px] sm:text-sm font-medium text-slate-600 mb-1.5">
                {label}
            </label>
            {children}
            {error && <p className="text-[10px] sm:text-xs text-rose-500 mt-1">{error}</p>}
        </div>
    );
}
