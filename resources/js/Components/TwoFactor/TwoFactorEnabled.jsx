export default function TwoFactorEnabled({disableForm,onDisable,}) 
{
    return (
        <section className="bg-white rounded-xl border border-emerald-200">
            <div className="px-5 py-4 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                        <span className="text-emerald-600 text-lg">
                            ✓
                        </span>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-slate-800">
                            Authentification à deux facteurs activée
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            Votre compte est actuellement protégé
                            par la 2FA.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <p className="text-sm text-slate-600 mb-5">
                    Vous devrez saisir un code généré par votre
                    application d'authentification lors de votre
                    prochaine connexion.
                </p>

                <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                    <h3 className="text-sm font-semibold text-red-700">
                        Désactiver la 2FA
                    </h3>

                    <p className="text-xs text-red-600 mt-1 mb-4">
                        Entrez votre mot de passe pour désactiver
                        l'authentification à deux facteurs.
                    </p>

                    <form
                        onSubmit={onDisable}
                        className="space-y-3 max-w-md"
                    >

                        <input
                            type="password"
                            value={disableForm.data.password}
                            onChange={(e) =>
                                disableForm.setData(
                                    "password",
                                    e.target.value
                                )
                            }
                            placeholder="Votre mot de passe"
                            className="block w-full rounded-lg border-slate-200 text-sm focus:border-[#3A7CA5] focus:ring-[#3A7CA5]/20"
                            required
                        />

                        {disableForm.errors.password && (
                            <p className="text-sm text-red-600">
                                {disableForm.errors.password}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={disableForm.processing}
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
                        >
                            {disableForm.processing
                                ? "Désactivation..."
                                : "Désactiver la 2FA"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}