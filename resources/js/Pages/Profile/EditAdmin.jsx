import { useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/LayoutAdmin";

import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function EditAdmin ({ mustVerifyEmail, status, comptableEmail }) {
    const { data, setData, patch, processing, errors } = useForm({
        comptable_email: comptableEmail || "",
    });

    const submitComptableEmail = (e) => {
        e.preventDefault();

        patch(route("profile.comptable-email.update"));
    };

    return (
        <AdminLayout page="Mon profil">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Mon profil
                    </h1>

                    <p className="text-sm text-slate-400 mt-1">
                        Gérez vos informations personnelles et les paramètres de votre compte.
                    </p>
                </div>

                <section className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Informations personnelles
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            Modifiez vos informations de profil.
                        </p>
                    </div>

                    <div className="p-5">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                </section>

                <section className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Email du comptable
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            Cet email recevra les notifications lors de l'approbation
                            d'une demande de congé.
                        </p>
                    </div>

                    <div className="p-5">
                        <form
                            onSubmit={submitComptableEmail}
                            className="max-w-xl"
                        >
                            <label
                                htmlFor="comptable_email"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Adresse email du comptable
                            </label>

                            <input
                                id="comptable_email"
                                type="email"
                                value={data.comptable_email}
                                onChange={(e) =>
                                    setData("comptable_email", e.target.value)
                                }
                                className="mt-2 block w-full rounded-lg border border-slate-300
                                           px-3 py-2.5 text-sm text-slate-700
                                           shadow-sm outline-none transition
                                           focus:border-[#3A7CA5] focus:ring-1 focus:ring-[#3A7CA5]"
                                placeholder="email@exemple.com"
                            />

                            {errors.comptable_email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.comptable_email}
                                </p>
                            )}

                            <p className="mt-2 text-xs text-slate-400">
                                Les demandes de congé approuvées seront envoyées à cette adresse.
                            </p>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-4 inline-flex items-center justify-center
                                           rounded-lg px-4 py-2.5 text-sm font-medium
                                           text-white transition hover:opacity-90
                                           disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: "#3A7CA5",
                                }}
                            >
                                {processing
                                    ? "Enregistrement..."
                                    : "Enregistrer"}
                            </button>
                        </form>
                    </div>
                </section>

                <section className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Mot de passe
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            Utilisez un mot de passe long et sécurisé.
                        </p>
                    </div>

                    <div className="p-5">
                        <UpdatePasswordForm />
                    </div>
                </section>

                {/* Authentification à deux facteurs */}
                <section className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Authentification à deux facteurs
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            Renforcez la sécurité de votre compte avec une deuxième
                            étape lors de la connexion.
                        </p>
                    </div>

                    <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    Protection de votre compte
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                    Configurez une application d'authentification
                                    pour protéger votre compte.
                                </p>
                            </div>

                            <a
                                href={route("two-factor.show")}
                                className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                                style={{
                                    backgroundColor: "#3A7CA5",
                                }}
                            >
                                Configurer la 2FA
                            </a>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-xl border border-red-100">
                    <div className="px-5 py-4 border-b border-red-50">
                        <h2 className="text-sm font-semibold text-red-600">
                            Zone dangereuse
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            La suppression du compte est définitive.
                        </p>
                    </div>

                    <div className="p-5">
                        <DeleteUserForm />
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
