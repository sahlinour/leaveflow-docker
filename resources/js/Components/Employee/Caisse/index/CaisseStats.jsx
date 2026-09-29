import React from "react";
import { Wallet, WalletCards, Banknote } from "lucide-react";
import { COLORS } from "@/theme";

export default function CaisseStats({fondCaisse = 0,compteCourantAssocie = 0,totalCaisse = 0,}) 
{
    const formatMoney = (value) =>
        Number(value || 0).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const stats = [
        {
            label: "Fond de caisse",
            value: fondCaisse,
            icon: Wallet,
        },
        {
            label: "Compte courant associé",
            value: compteCourantAssocie,
            icon: WalletCards,
        },
        {
            label: "Total de caisse",
            value: totalCaisse,
            icon: Banknote,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
                                    {stat.label}
                                </p>

                                <p
                                    className="mt-1 text-lg font-bold sm:text-xl"
                                    style={{
                                        color: COLORS.dark,
                                    }}
                                >
                                    {formatMoney(stat.value)} DH
                                </p>
                            </div>

                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10"
                                style={{
                                    backgroundColor: COLORS.bgSoft,
                                }}
                            >
                                <Icon
                                    size={19}
                                    style={{
                                        color: COLORS.dark,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}