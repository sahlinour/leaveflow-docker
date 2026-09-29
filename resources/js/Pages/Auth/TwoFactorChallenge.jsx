import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function TwoFactorChallenge() {
    const {data,setData,post,processing,errors,} = useForm({code: "",});
    const submit = (e) => {
        e.preventDefault();
        post(route("two-factor.challenge.verify"));
    };

    return (
        <GuestLayout>
            <Head title="Vérification 2FA" />
            <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <span className="text-xl">🔐</span>
                </div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Vérification en deux étapes
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Saisissez le code à 6 chiffres affiché dans votre
                    application d'authentification.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label
                        htmlFor="code"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Code de vérification
                    </label>

                    <TextInput
                        id="code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        autoComplete="one-time-code"
                        autoFocus
                        className="mt-2 block w-full text-center text-xl tracking-[0.5em]"
                        value={data.code}
                        onChange={(e) =>
                            setData(
                                "code",
                                e.target.value.replace(/\D/g, "")
                            )
                        }
                        required
                    />

                    <InputError
                        className="mt-2"
                        message={errors.code}
                    />
                </div>

                <PrimaryButton
                    className="w-full justify-center py-3"
                    disabled={processing || data.code.length !== 6}
                >
                    {processing
                        ? "Vérification..."
                        : "Vérifier le code"}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}