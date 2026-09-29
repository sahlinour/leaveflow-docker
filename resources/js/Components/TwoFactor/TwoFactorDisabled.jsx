export default function TwoFactorDisabled({onStartSetup,}) 
{
    return (
        <section className="bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800">
                    Protéger votre compte
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                    Utilisez une application comme Google
                    Authenticator pour sécuriser votre compte.
                </p>
            </div>

            <div className="p-5">
                <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 mb-5">

                    <p className="text-sm text-slate-600">
                        La double authentification ajoute une
                        deuxième étape lors de la connexion.
                        Même si votre mot de passe est connu,
                        votre compte reste protégé.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onStartSetup}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                    style={{
                        backgroundColor: "#3A7CA5",
                    }}
                >
                    Activer la 2FA
                </button>
            </div>
        </section>
    );
}