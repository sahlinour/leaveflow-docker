export default function RegistrationSteps({ step }) {
    return (
        <div className="flex items-center mb-5">
            <div className="flex items-center flex-1">
                <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        step >= 1
                            ? "text-white"
                            : "bg-slate-100 text-slate-400"
                    }`}
                    style={{
                        backgroundColor:
                            step >= 1 ? "#2F6690" : undefined,
                    }}
                >
                    1
                </div>

                <div className="ml-2">
                    <p className="text-xs font-medium text-slate-700">
                        Personnel
                    </p>
                </div>
            </div>

            <div
                className={`h-px flex-1 mx-3 ${
                    step >= 2 ? "bg-[#2F6690]" : "bg-slate-200"
                }`}
            />

            <div className="flex items-center">
                <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        step >= 2
                            ? "text-white"
                            : "bg-slate-100 text-slate-400"
                    }`}
                    style={{
                        backgroundColor:
                            step >= 2 ? "#2F6690" : undefined,
                    }}
                >
                    2
                </div>

                <div className="ml-2">
                    <p className="text-xs font-medium text-slate-700">
                        Professionnel
                    </p>
                </div>
            </div>
        </div>
    );
}