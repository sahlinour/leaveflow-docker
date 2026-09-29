import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,} from "recharts";
import { COLORS } from "../../../theme";

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3">
            <p className="font-semibold text-slate-700 mb-2">
                {label}
            </p>

            {payload.map((entry) => (
                <div
                    key={entry.dataKey}
                    className="flex justify-between gap-5 text-sm"
                >
                    <span style={{ color: entry.color }}>
                        {entry.dataKey === "Approved"
                            ? "Approuvées"
                            : entry.dataKey === "Pending"
                            ? "En attente"
                            : "Rejetées"}
                    </span>

                    <span className="font-medium text-slate-700">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function MonthlyRequestsChart({
    data = [],
    annee,
}) {
    const isEmpty =
        !data.length ||
        data.every(
            (m) =>
                Number(m.Approved ?? 0) === 0 &&
                Number(m.Pending ?? 0) === 0 &&
                Number(m.Rejected ?? 0) === 0
        );

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5">

            {/* Header */}
            <div className="flex items-center justify-between mb-1">
                <div>
                    <h2 className="font-semibold text-slate-800">
                        Mes demandes de congés mensuelles
                    </h2>

                    <p className="text-xs text-slate-400">
                        Mes demandes uniquement · {annee}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-72 mt-4">

                {isEmpty ? (
                    <div className="h-full flex items-center justify-center text-sm text-slate-400">
                        Aucune demande enregistrée pour {annee}.
                    </div>
                ) : (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={data}
                            barGap={4}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#EEF2F5"
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#94A3B8",
                                }}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#94A3B8",
                                }}
                                allowDecimals={false}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{
                                    fill: "#F4F7F9",
                                }}
                            />

                            {/* Approuvées */}
                            <Bar
                                dataKey="Approved"
                                name="Approuvées"
                                fill={COLORS.approved}
                                radius={[3, 3, 0, 0]}
                            />

                            {/* En attente */}
                            <Bar
                                dataKey="Pending"
                                name="En attente"
                                fill={COLORS.pending}
                                radius={[3, 3, 0, 0]}
                            />

                            {/* Rejetées */}
                            <Bar
                                dataKey="Rejected"
                                name="Rejetées"
                                fill={COLORS.rejected}
                                radius={[3, 3, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                )}

            </div>
        </div>
    );
}
