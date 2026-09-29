import React from "react";
import { Wallet } from "lucide-react";

export default function CaisseTotal({ total }) {
    return (
        <div
            className="mt-5 rounded-xl p-4 sm:mt-6 sm:p-5"
            style={{
                backgroundColor: "#16425B",
            }}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
                        Total de la caisse
                    </p>
                    <p className="mt-1 truncate text-2xl font-bold text-white sm:text-3xl">
                        {Number(total).toFixed(2)} DH
                    </p>
                </div>

                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 sm:rounded-xl"
                    style={{backgroundColor: "#2F6690",}}
                >
                    <Wallet
                        size={20}
                        className="text-white sm:h-6 sm:w-6"
                    />
                </div>

            </div>
        </div>
    );
}