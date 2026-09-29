import React from "react";

export default function DetteStatCard({ label, value, icon: Icon }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>
                    <p
                        className="mt-2 text-2xl font-bold"
                        style={{ color: "#16425B" }}
                    >
                        {value}
                    </p>
                </div>
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#E8F3F7" }}
                >
                    <Icon size={22} style={{ color: "#2F6690" }} />
                </div>
            </div>
        </div>
    );
}