import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm() {

    const [confirmingUserDeletion, setConfirmingUserDeletion] =
        useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const cancelDeletion = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,

            onSuccess: () => {
                setConfirmingUserDeletion(false);
            },

            onFinish: () => {
                reset();
            },
        });
    };

    return (
        <div>

            {!confirmingUserDeletion ? (
                <div>

                    <p className="text-sm text-slate-500 max-w-2xl">
                        Une fois votre compte supprimé, toutes vos
                        données associées seront définitivement supprimées.
                        Cette action ne peut pas être annulée.
                    </p>

                    <button
                        type="button"
                        onClick={confirmDeletion}
                        className="
                            mt-4
                            rounded-lg
                            border border-red-200
                            bg-red-50
                            px-4 py-2.5
                            text-sm
                            font-medium
                            text-red-600
                            hover:bg-red-100
                            transition
                        "
                    >
                        Supprimer mon compte
                    </button>

                </div>
            ) : (
                <form
                    onSubmit={deleteUser}
                    className="max-w-xl space-y-5"
                >

                    <div className="rounded-lg bg-red-50 border border-red-100 p-4">

                        <p className="text-sm font-medium text-red-700">
                            Êtes-vous sûr de vouloir supprimer votre compte ?
                        </p>

                        <p className="text-xs text-red-600 mt-1">
                            Cette action est définitive.
                        </p>

                    </div>

                    {/* Mot de passe */}
                    <div>

                        <label
                            htmlFor="delete_password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Confirmez avec votre mot de passe
                        </label>

                        <input
                            id="delete_password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData(
                                    "password",
                                    e.target.value
                                )
                            }
                            className="
                                mt-2
                                block w-full
                                rounded-lg
                                border-slate-200
                                text-sm
                                text-slate-700
                                shadow-none
                                focus:border-red-400
                                focus:ring-red-400/20
                            "
                            autoFocus
                        />

                        {errors.password && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}

                    </div>

                    {/* Boutons */}
                    <div className="flex flex-col sm:flex-row gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                rounded-lg
                                bg-red-600
                                px-4 py-2.5
                                text-sm
                                font-medium
                                text-white
                                hover:bg-red-700
                                disabled:opacity-60
                            "
                        >
                            {processing
                                ? "Suppression..."
                                : "Oui, supprimer mon compte"}
                        </button>

                        <button
                            type="button"
                            onClick={cancelDeletion}
                            className="
                                rounded-lg
                                border border-slate-200
                                px-4 py-2.5
                                text-sm
                                font-medium
                                text-slate-600
                                hover:bg-slate-50
                            "
                        >
                            Annuler
                        </button>

                    </div>

                </form>
            )}

        </div>
    );
}
