import React from "react";
import {Calculator,LockKeyhole,} from "lucide-react";
import CaisseRow from "./CaisseRow";
import CaisseTotal from "./CaisseTotal";

const COUPURES = [
    1,
    5,
    10,
    20,
    50,
    100,
    200,
];

export default function CaisseForm({montants,quantites,totalCaisse,onChange,onSubmit,onCloturer,modeModification = false,}) 
{
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <form
                onSubmit={onSubmit}
                className="p-6"
            >
                <div className="space-y-4">
                    {COUPURES.map(
                        (coupure) => (
                            <CaisseRow
                                key={coupure}
                                coupure={coupure}
                                montant={
                                    montants[
                                        coupure
                                    ]
                                }
                                quantite={
                                    quantites[
                                        coupure
                                    ]
                                }
                                onChange={
                                    onChange
                                }
                            />
                        )
                    )}
                </div>

                <CaisseTotal
                    total={totalCaisse}
                />
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
                        style={{
                            backgroundColor:
                                "#2F6690",
                        }}
                    >
                        <Calculator
                            size={18}
                        />
                        {modeModification
                            ? "Enregistrer les modifications"
                            : "Enregistrer"}

                    </button>
                    <button
                        type="button"
                        onClick={
                            onCloturer
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:bg-slate-50 sm:w-auto"
                        style={{borderColor: "#16425B",color: "#16425B",}}
                    >
                        <LockKeyhole
                            size={18}
                        />
                        Clôturer la caisse
                    </button>
                    
                </div>
            </form>
        </div>
    );
}