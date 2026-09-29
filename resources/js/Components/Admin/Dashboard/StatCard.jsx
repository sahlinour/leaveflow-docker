const tones = {
    neutral: "bg-slate-100 text-slate-500",
    pending: "bg-amber-50 text-amber-500",
    approved: "bg-emerald-50 text-emerald-600",
    rejected: "bg-rose-50 text-rose-500",
};

export default function StatCard({ label, value, icon: Icon, tone = "neutral", delta }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500">{label}</p>

                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${tones[tone]}`}>
                    <Icon size={18} />
                </div>
            </div>

            <p className="text-2xl font-bold text-slate-800">{value}</p>

            {delta && (
                <p className="text-xs text-emerald-600 font-medium mt-1">
                    {delta}
                </p>
            )}
        </div>
    );
}
