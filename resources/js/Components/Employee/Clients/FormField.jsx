export default function FormField({
    label,
    error,
    children,
    required = false,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}

                {required && (
                    <span className="text-red-500 ml-1">*</span>
                )}
            </label>

            {children}

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}