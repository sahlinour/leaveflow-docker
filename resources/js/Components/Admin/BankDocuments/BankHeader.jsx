import { Landmark, Plus } from "lucide-react";
import { COLORS } from "../../../theme";

export default function BankHeader({ onCreate }) {
    return (
        <div className="flex w-full flex-row items-center justify-between gap-2 p-3 sm:gap-3 sm:p-4 md:p-5">
            <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <div className="min-w-0">
                        <h1 className="truncate text-base font-bold text-slate-800 sm:text-lg md:text-xl lg:text-2xl">
                            Documents bancaires
                        </h1>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:mt-1 sm:text-xs md:text-sm">
                            Gestion des comptes bancaires des entreprises.
                        </p>
                    </div>
                </div>
            </div>

            {onCreate && (
                <button
                    type="button"
                    onClick={onCreate}
                    className="inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg px-2 py-2 text-[10px] font-medium text-white transition hover:opacity-90 sm:gap-1.5 sm:px-3 sm:py-2.5 sm:text-xs md:gap-2 md:px-4 md:text-sm"
                    style={{ backgroundColor: COLORS.dark }}
                >
                    <Plus
                        size={13}
                        className="sm:h-4 sm:w-4"
                    />

                    <span>Ajouter une banque</span>
                </button>
            )}
        </div>
    );
}