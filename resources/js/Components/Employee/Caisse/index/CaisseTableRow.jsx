import React from "react";
import {CalendarDays,CircleCheck,Clock3,} from "lucide-react";
import CaisseActions from "./CaisseActions";

const COLORS = {
    primary: "#16425B",
    secondary: "#2F6690",
    light: "#81C3D7",
    background: "#E8F3F7",
    success: "#16A34A",
    danger: "#DC2626",
};

const formatMoney = (value) =>
    Number(value || 0).toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
const formatDate = (value) => {
    if (!value) return "-";
    const date = String(value).substring(0, 10);
    const [year, month, day] = date.split("-");
    if (!year || !month || !day) return value;

    return `${day}/${month}/${year}`;
};

const badgeBaseClasses =
    "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold lg:text-[9px] xl:text-[10px]";

export default function CaisseTableRow({ caisse }) {
    const totalCaisse = Number(caisse.total_caisse || 0);
    const totalDettes = Number(caisse.total_dettes || 0);
    const totalDisponible = Number(caisse.total_disponible ?? caisse.fond_caisse ??0);
    const totalGeneral = Number(
        caisse.total_general ?? totalCaisse + totalDettes
    );
    const soldeFinal = Number(
        caisse.solde_final ?? totalDisponible - totalGeneral
    );
    const estCloturee = caisse.statut === "cloturee";

    return (
        <tr className="transition hover:bg-slate-50">
            <td className="whitespace-nowrap px-3 py-3 lg:py-2.5">
                <div className="flex items-center gap-1.5">
                    <CalendarDays
                        size={15}
                        className="shrink-0 text-slate-400"
                    />

                    <span className="text-xs font-medium text-slate-700 lg:text-[11px] xl:text-xs">
                        {formatDate(caisse.date_caisse)}
                    </span>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3 text-right lg:py-2.5">
                <span
                    className="text-xs font-medium lg:text-[11px] xl:text-xs"
                    style={{
                        color: COLORS.primary,
                    }}
                >
                    {formatMoney(totalDisponible)} DH
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-3 text-right lg:py-2.5">
                <span
                    className="text-xs font-semibold lg:text-[11px] xl:text-xs"
                    style={{
                        color: COLORS.primary,
                    }}
                >
                    {formatMoney(totalCaisse)} DH
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-3 text-right lg:py-2.5">
                <span
                    className="text-xs font-medium lg:text-[11px] xl:text-xs"
                    style={{
                        color: COLORS.secondary,
                    }}
                >
                    {formatMoney(totalDettes)} DH
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-3 text-right lg:py-2.5">
                <span
                    className="text-xs font-semibold lg:text-[11px] xl:text-xs"
                    style={{
                        color: COLORS.primary,
                    }}
                >
                    {formatMoney(totalGeneral)} DH
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-3 text-right lg:py-2.5">
                <span
                    className="text-xs font-semibold lg:text-[11px] xl:text-xs"
                    style={{
                        color:
                            soldeFinal >= 0
                                ? COLORS.success
                                : COLORS.danger,
                    }}
                >
                    {soldeFinal >= 0 ? "+" : ""}
                    {formatMoney(soldeFinal)} DH
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-3 text-center lg:py-2.5">
                {estCloturee ? (
                    <span
                        className={`${badgeBaseClasses} bg-green-50 text-green-700`}
                    >
                        <CircleCheck size={12} />
                        Clôturée
                    </span>
                ) : (
                    <span
                        className={`${badgeBaseClasses} bg-amber-50 text-amber-700`}
                    >
                        <Clock3 size={12} />
                        Ouverte
                    </span>
                )}
            </td>
            <td className="whitespace-nowrap px-3 py-3 lg:py-2.5">
                <CaisseActions caisse={caisse} />
            </td>
        </tr>
    );
}
