import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,} from "recharts";
import { COLORS } from "../../../theme";

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3">
            <p className="font-semibold mb-2">{label}</p>

            {payload.map((entry) => (
                <div
                    key={entry.dataKey}
                    className="flex justify-between gap-5"
                    style={{ color: entry.color }}
                >
                    <span>{entry.dataKey}</span>
                    <span>{entry.value}</span>
                </div>
            ))}
        </div>
    );
}

export default function MonthlyRequestsChart({ data, year }) {
    const empty = data?.every(
        (m) => m.Approved === 0 && m.Pending === 0 && m.Rejected === 0
    );

    return (
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800">
                Demandes de Congés Mensuelles
            </h2>

            <p className="text-xs text-slate-400">
                Toutes les entreprises combinées · {year}
            </p>

            <div className="h-72 mt-4">
                {empty ? (
                    <div className="h-full flex items-center justify-center text-sm text-slate-400">
                        Aucune demande enregistrée pour {year}.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barGap={4}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#EEF2F5"
                            />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "#94A3B8" }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "#94A3B8" }}
                                allowDecimals={false}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: "#F4F7F9" }}
                            />
                            <Bar dataKey="Approved" fill={COLORS.approved} radius={[3, 3, 0, 0]} />
                            <Bar dataKey="Pending" fill={COLORS.pending} radius={[3, 3, 0, 0]} />
                            <Bar dataKey="Rejected" fill={COLORS.rejected} radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
