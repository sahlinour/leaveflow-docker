import React from "react";
import { ReceiptText } from "lucide-react";

export default function DettesEmptyState() {
    return (
        <div className="px-6 py-14 text-center">
            <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E8F3F7" }}
            >
                <ReceiptText size={26} style={{ color: "#16425B" }} />
            </div>
            <h3
                className="mt-4 font-semibold"
                style={{ color: "#16425B" }}
            >
                Aucune dette enregistrée
            </h3>
            <p className="mt-1 text-sm text-slate-500">
                Ajoutez une dette pour commencer.
            </p>
        </div>
    );
}