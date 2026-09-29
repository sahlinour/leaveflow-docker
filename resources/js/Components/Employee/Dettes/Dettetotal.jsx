import React from "react";
import { Banknote } from "lucide-react";

export default function DetteTotal({ total }) {
    const formatMoney = (value) => {
        return Number(value || 0).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div
            className="mt-6 flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ backgroundColor: "#F0F7FA", borderColor: "#81C3D7" }}
        >
            <div>
                <p className="text-sm font-medium text-slate-500">
                    Total des dettes
                </p>
                <p
                    className="mt-1 text-2xl font-bold"
                    style={{ color: "#16425B" }}
                >
                    {formatMoney(total)} DH
                </p>
            </div>
            <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#E8F3F7" }}
            >
                <Banknote size={23} style={{ color: "#2F6690" }} />
            </div>
        </div>
    );
}