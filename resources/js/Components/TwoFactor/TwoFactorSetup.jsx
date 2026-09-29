import { QRCodeSVG } from "qrcode.react";

export default function TwoFactorSetup({secret,otpAuthUrl,confirmForm,onConfirm,}) 
{
    return (
        <section className="bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800">
                    Configuration de la 2FA
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                    Suivez les étapes ci-dessous pour terminer
                    l'activation.
                </p>
            </div>

            <div className="p-5">
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-700">
                        1. Ouvrez votre application
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Ouvrez Google Authenticator ou une autre
                        application compatible avec la 2FA.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">
                        2. Scannez le QR Code
                    </h3>
                    <div className="flex justify-center sm:justify-start">
                        <div className="p-4 bg-white border border-slate-200 rounded-xl">
                            <QRCodeSVG
                                value={otpAuthUrl}
                                size={220}
                                level="M"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-6 max-w-xl">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">
                        Impossible de scanner ?
                    </h3>

                    <p className="text-xs text-slate-500 mb-2">
                        Entrez manuellement cette clé dans votre
                        application d'authentification :
                    </p>

                    <div className="rounded-lg bg-slate-100 border border-slate-200 px-4 py-3">

                        <code className="text-sm font-mono text-slate-700 break-all">
                            {secret}
                        </code>

                    </div>
                </div>

                {/* Étape 3 */}
                <form
                    onSubmit={onConfirm}
                    className="max-w-md space-y-4"
                >
                    <div>
                        <label
                            htmlFor="code"
                            className="block text-sm font-medium text-slate-700"
                        >
                            3. Entrez le code à 6 chiffres
                        </label>

                        <p className="text-xs text-slate-400 mt-1 mb-2">
                            Saisissez le code affiché dans votre
                            application.
                        </p>

                        <input
                            id="code"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={confirmForm.data.code}
                            onChange={(e) =>
                                confirmForm.setData(
                                    "code",
                                    e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6)
                                )
                            }
                            className="block w-full rounded-lg border-slate-200 text-center text-xl tracking-[0.5em] focus:border-[#3A7CA5] focus:ring-[#3A7CA5]/20"
                            placeholder="000000"
                            required
                        />

                        {confirmForm.errors.code && (
                            <p className="text-sm text-red-600 mt-1">
                                {confirmForm.errors.code}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={
                            confirmForm.processing ||
                            confirmForm.data.code.length !== 6
                        }
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:opacity-60"
                        style={{
                            backgroundColor: "#3A7CA5",
                        }}
                    >
                        {confirmForm.processing
                            ? "Vérification..."
                            : "Confirmer l'activation"}
                    </button>
                </form>
            </div>
        </section>
    );
}