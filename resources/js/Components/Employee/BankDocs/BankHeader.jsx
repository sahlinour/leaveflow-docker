import { Landmark } from "lucide-react";
import { COLORS } from "../../../theme";

export default function BankHeader() {
    return (
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <div>
                    <h1
                        className="truncate text-slate-800 text-lg font-bold sm:text-xl md:text-2xl"
                    >
                        Documents bancaires
                    </h1>

                    <p
                        className="truncate text-[10px] text-slate-400 sm:text-xs md:text-sm"
                    >
                        Sélectionnez une banque pour générer votre document
                        bancaire.
                    </p>
                </div>
            </div>
        </div>
    );
}