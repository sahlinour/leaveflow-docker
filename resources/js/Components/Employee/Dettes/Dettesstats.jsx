import React from "react";
import { Banknote, ReceiptText } from "lucide-react";
import DetteStatCard from "./Dettestatcard";

export default function DettesStats({
    totalDettes,
    nombreDettes,
    formatMoney,
}) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <DetteStatCard
                label="Total des dettes"
                value={`${formatMoney(totalDettes)} DH`}
                icon={Banknote}
            />

            <DetteStatCard
                label="Nombre de dettes"
                value={nombreDettes}
                icon={ReceiptText}
            />
        </div>
    );
}