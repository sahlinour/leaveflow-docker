export default function DashboardHeader({ prenom, nom }) {
    return (
        <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
                <h1 className="text-xl font-bold text-slate-800">
                    Bonjour, {prenom} {nom}
                </h1>
                <p className="text-sm text-slate-400">
                    Aujourd'hui • {new Date().toLocaleDateString("fr-FR")}
                </p>
            </div>
        </div>
    );
}