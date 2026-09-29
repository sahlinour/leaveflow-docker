import { useForm } from "@inertiajs/react";
import InputLabel from "../../../Components/InputLabel";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";

export default function UpdatePasswordForm() {

    const {
        data,
        setData,
        put,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-5 max-w-xl"
        >

            {/* Mot de passe actuel */}
            <div>
                <InputLabel
                    htmlFor="current_password"
                    value="Mot de passe actuel"
                    className="text-sm font-medium text-slate-700"
                />

                <TextInput
                    id="current_password"
                    type="password"
                    value={data.current_password}
                    onChange={(e) =>
                        setData(
                            "current_password",
                            e.target.value
                        )
                    }
                    className="
                        mt-2 block w-full
                        rounded-lg
                        border-slate-200
                        text-sm
                        shadow-none
                        focus:border-[#3A7CA5]
                        focus:ring-[#3A7CA5]/20
                    "
                    autoComplete="current-password"
                />

                <InputError
                    className="mt-1"
                    message={errors.current_password}
                />
            </div>

            {/* Nouveau mot de passe */}
            <div>
                <InputLabel
                    htmlFor="password"
                    value="Nouveau mot de passe"
                    className="text-sm font-medium text-slate-700"
                />

                <TextInput
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                        setData(
                            "password",
                            e.target.value
                        )
                    }
                    className="
                        mt-2 block w-full
                        rounded-lg
                        border-slate-200
                        text-sm
                        shadow-none
                        focus:border-[#3A7CA5]
                        focus:ring-[#3A7CA5]/20
                    "
                    autoComplete="new-password"
                />

                <InputError
                    className="mt-1"
                    message={errors.password}
                />
            </div>

            {/* Confirmation */}
            <div>
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirmer le nouveau mot de passe"
                    className="text-sm font-medium text-slate-700"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData(
                            "password_confirmation",
                            e.target.value
                        )
                    }
                    className="
                        mt-2 block w-full
                        rounded-lg
                        border-slate-200
                        text-sm
                        shadow-none
                        focus:border-[#3A7CA5]
                        focus:ring-[#3A7CA5]/20
                    "
                    autoComplete="new-password"
                />

                <InputError
                    className="mt-1"
                    message={errors.password_confirmation}
                />
            </div>

            {/* Bouton */}
            <div className="flex items-center gap-4 pt-2">

                <button
                    type="submit"
                    disabled={processing}
                    className="
                        rounded-lg
                        px-4 py-2.5
                        text-sm
                        font-medium
                        text-white
                        disabled:opacity-60
                    "
                    style={{
                        backgroundColor: "#3A7CA5",
                    }}
                >
                    {processing
                        ? "Modification..."
                        : "Modifier le mot de passe"}
                </button>

                {recentlySuccessful && (
                    <p className="text-sm text-emerald-600">
                        Mot de passe modifié.
                    </p>
                )}

            </div>

        </form>
    );
}
