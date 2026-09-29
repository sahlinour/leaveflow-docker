import React from "react";
import {
    CalendarDays,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import DetteJourTable from "./Dettejourtable";

export default function DetteJourGroup({
    date,
    listeDettes,
    ouverte,
    onToggle,
    formatDate,
    formatMoney,
    onDelete,
}) {
    const totalJour = listeDettes.reduce(
        (total, dette) =>
            total + Number(dette.montant || 0),
        0
    );

    return (
        <div>

            <button
                type="button"
                onClick={() => onToggle(date)}
                className="flex w-full items-center justify-between gap-3 bg-slate-50 px-3 py-3 text-left transition hover:bg-slate-100 sm:px-4 sm:py-3.5"
            >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                    <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9"
                        style={{
                            backgroundColor: "#E8F3F7",
                        }}
                    >
                        <CalendarDays
                            size={16}
                            className="sm:h-[18px] sm:w-[18px]"
                            style={{
                                color: "#2F6690",
                            }}
                        />
                    </div>

                    <div className="min-w-0">

                        <p
                            className="truncate text-xs font-semibold sm:text-sm"
                            style={{
                                color: "#16425B",
                            }}
                        >
                            {formatDate(date)}
                        </p>

                        <p className="text-[11px] text-slate-500 sm:text-xs">
                            {listeDettes.length} dette(s)
                        </p>

                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">

                    <div className="text-right">

                        <p className="hidden text-xs text-slate-500 sm:block">
                            Total du jour
                        </p>

                        <p
                            className="text-xs font-bold sm:text-sm"
                            style={{
                                color: "#16425B",
                            }}
                        >
                            {formatMoney(totalJour)} DH
                        </p>

                    </div>

                    {ouverte ? (
                        <ChevronUp
                            size={17}
                            className="shrink-0 text-slate-400 sm:h-[18px] sm:w-[18px]"
                        />
                    ) : (
                        <ChevronDown
                            size={17}
                            className="shrink-0 text-slate-400 sm:h-[18px] sm:w-[18px]"
                        />
                    )}

                </div>
            </button>

            {ouverte && (
                <DetteJourTable
                    listeDettes={listeDettes}
                    formatMoney={formatMoney}
                    onDelete={onDelete}
                />
            )}

        </div>
    );
}