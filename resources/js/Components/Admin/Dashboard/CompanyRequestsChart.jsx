import {PieChart,Pie,Cell,ResponsiveContainer,} from "recharts";

export default function CompanyRequestsChart({ data, year }) {
    if (!data?.length) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-800">Par Entreprise</h2>
                <p className="text-xs text-slate-400 mb-2">
                    Répartition des congés · {year}
                </p>

                <div className="h-48 flex items-center justify-center text-sm text-slate-400">
                    Aucune donnée pour {year}.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800">Par Entreprise</h2>

            <p className="text-xs text-slate-400 mb-2">
                Répartition des congés · {year}
            </p>

            <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={3}
                            strokeWidth={0}
                        >
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
                {data.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="flex items-center gap-2 text-slate-600">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            {item.name}
                        </span>

                        <span className="font-semibold text-slate-700">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
