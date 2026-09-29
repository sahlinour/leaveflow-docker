export default function ContrainteHeader({ company }) {
    return (
        <>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <span>LeaveFlow</span>
                <span>/</span>
                <span className="text-slate-700 font-medium">Contraintes de congés</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
                <p className="text-sm text-slate-500">Entreprise</p>
                <h2 className="text-xl font-bold text-slate-800 mt-1">
                    🏢 {company.nom}
                </h2>
            </div>
        </>
    );
}