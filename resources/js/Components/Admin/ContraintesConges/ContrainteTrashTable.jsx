import ContrainteTrashActions from "./ContrainteTrashActions";

export default function ContrainteTrashTable({ companies }) {
    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-slate-100 text-left text-slate-400">
                    <th className="px-5 py-3">Entreprise</th>
                    <th className="px-5 py-3">Adresse</th>
                    <th className="px-5 py-3">Téléphone</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                </tr>
            </thead>

            <tbody>
                {companies.map((company) => (
                    <tr
                        key={company.id}
                        className="border-b border-slate-50 hover:bg-slate-50"
                    >
                        <td className="px-5 py-4 font-medium text-slate-800">
                            {company.nom}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                            {company.adresse ?? "—"}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                            {company.telephone ?? "—"}
                        </td>

                        <td className="px-5 py-4">
                            <ContrainteTrashActions company={company} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
