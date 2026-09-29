import LayoutAdmin from "../../../Layouts/LayoutAdmin";
import { COLORS } from "../../../theme";

export default function Show({ demande }) {
    return (
        <LayoutAdmin page="Rapport de demande">

            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-xl p-8">

                <div className="flex justify-between items-center border-b pb-5 mb-6">

                    <div>

                        <h1
                            className="text-2xl font-bold"
                            style={{ color: COLORS.dark }}
                        >
                            Rapport de demande de congé
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Référence : {demande.reference_demande}
                        </p>

                    </div>

                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: COLORS.dark }}
                    >
                        Imprimer
                    </button>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <Info
                        label="Employé"
                        value={`${demande.user.prenom} ${demande.user.nom}`}
                    />

                    <Info
                        label="Entreprise"
                        value={demande.user.company?.nom}
                    />

                    <Info
                        label="Email"
                        value={demande.user.email}
                    />

                    <Info
                        label="Poste"
                        value={demande.user.poste}
                    />

                    <Info
                        label="Type de congé"
                        value={demande.type_conge}
                    />

                    <Info
                        label="Statut"
                        value={demande.statut}
                    />

                    <Info
                        label="Date de début"
                        value={formatDate(demande.date_debut)}
                    />

                    <Info
                        label="Date de fin"
                        value={formatDate(demande.date_fin)}
                    />

                    <Info
                        label="Nombre de jours"
                        value={`${demande.nombre_jours} jour(s)`}
                    />

                </div>

                <div className="mt-8">

                    <h2 className="font-semibold text-slate-700 mb-2">
                        Motif
                    </h2>

                    <div className="border rounded-lg p-4 bg-slate-50 text-slate-700 min-h-[120px]">
                        {demande.motif || "Aucun motif"}
                    </div>

                </div>

                {demande.justificatif && (

                    <div className="mt-8">

                        <h2 className="font-semibold text-slate-700 mb-2">
                            Justificatif
                        </h2>

                        <a
                            href={`/storage/${demande.justificatif}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Ouvrir le justificatif
                        </a>

                    </div>

                )}

            </div>

        </LayoutAdmin>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="font-semibold text-slate-800 mt-1">
                {value || "-"}
            </p>
        </div>
    );
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR");
}