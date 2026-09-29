import {
    Building2,
    CreditCard,
    FileText,
    MapPin,
    Pencil,
    Trash2,
} from "lucide-react";
import { COLORS } from "../../../theme";

export default function CompanyBankCard({
    companyBank,
    onEdit,
    onDelete,
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                            backgroundColor: `${COLORS.pale}40`,
                        }}
                    >
                        <Building2
                            className="h-5 w-5"
                            style={{ color: COLORS.mid }}
                        />
                    </div>

                    <div>
                        <h3
                            className="font-semibold"
                            style={{ color: COLORS.dark }}
                        >
                            {companyBank.bank?.nom}
                        </h3>

                        <p className="text-xs text-slate-500">
                            Compte bancaire
                        </p>
                    </div>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => onEdit(companyBank)}
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                        style={{ color: COLORS.mid }}
                        title="Modifier"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    <button
                        onClick={() => onDelete(companyBank)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        title="Supprimer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <Info
                    icon={CreditCard}
                    label="Numéro de compte"
                    value={companyBank.numero_compte}
                />

                <Info
                    icon={Building2}
                    label="Bénéficiaire"
                    value={companyBank.nom_beneficiaire}
                />

                <Info
                    icon={CreditCard}
                    label="Compte bénéficiaire"
                    value={companyBank.numero_compte_beneficiaire}
                />

                <Info
                    icon={MapPin}
                    label="Ville"
                    value={companyBank.ville}
                />

                <Info
                    icon={FileText}
                    label="Motif"
                    value={companyBank.motif}
                />
            </div>
        </div>
    );
}

function Info({ icon: Icon, label, value }) {
    return (
        <div className="flex gap-3">
            <Icon className="mt-0.5 h-4 w-4 text-slate-400" />

            <div className="min-w-0">
                <p className="text-xs text-slate-500">
                    {label}
                </p>

                <p className="truncate text-sm font-medium text-slate-700">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
}