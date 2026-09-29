export default function ContrainteSettings({ rows }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
            {rows.map((row, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-5">
                    <div>
                        <p className="font-semibold text-slate-800">{row.title}</p>
                        <p className="text-sm text-slate-400 mt-0.5">{row.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button type="button" onClick={row.onDecrement}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50 active:scale-95 transition">
                            −
                        </button>

                        <span className="w-8 text-center font-bold text-slate-800 text-lg">
                            {row.value}
                        </span>

                        <button type="button" onClick={row.onIncrement}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-50 active:scale-95 transition">
                            +
                        </button>

                        <span className="text-sm text-slate-400 w-16">{row.unit}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}