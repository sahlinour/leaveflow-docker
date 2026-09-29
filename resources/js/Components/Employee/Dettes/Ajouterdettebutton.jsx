import React from "react";
import { Plus } from "lucide-react";

export default function AjouterDetteButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#81C3D7] bg-[#F0F7FA] px-4 py-3 text-sm font-semibold transition hover:bg-[#E8F3F7]"
            style={{ color: "#2F6690" }}
        >
            <Plus size={18} />
            Ajouter une autre dette
        </button>
    );
}