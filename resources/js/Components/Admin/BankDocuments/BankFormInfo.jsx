export default function BankFormInfo() {
    return (
        <div className="mx-6 mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-800">
                Génération automatique du document
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
                Le document Word sera généré automatiquement
                avec le template par défaut associé à la banque
                sélectionnée.
            </p>
        </div>
    );
}