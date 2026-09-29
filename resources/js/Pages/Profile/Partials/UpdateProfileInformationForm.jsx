import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "../../../Components/InputLabel";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import PrimaryButton from "../../../Components/PrimaryButton";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        prenom: user.prenom || "", 
        nom: user.nom || "",
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-5"
        >

            {/* Nom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                {/* Prénom */} 
                <div> 
                    <InputLabel htmlFor="prenom" value="Prénom" className="text-sm font-medium text-slate-700" /> 
                    <TextInput id="prenom" type="text" 
                        className=" mt-2 block w-full rounded-lg border-slate-200 text-sm text-slate-700 shadow-none focus:border-[#3A7CA5] focus:ring-[#3A7CA5]/20 " 
                        value={data.prenom} onChange={(e) => setData("prenom", e.target.value) } required autoComplete="given-name" /> 
                    <InputError className="mt-1" message={errors.prenom} /> 
            </div> 
                {/* Nom */} 
                <div> 
                    <InputLabel htmlFor="nom" value="Nom" 
                        className="text-sm font-medium text-slate-700" /> 
                    <TextInput id="nom" type="text" className=" mt-2 block w-full rounded-lg border-slate-200 text-sm text-slate-700 shadow-none focus:border-[#3A7CA5] focus:ring-[#3A7CA5]/20 " 
                        value={data.nom} onChange={(e) => setData("nom", e.target.value) } required autoComplete="family-name" /> 
                    <InputError className="mt-1" message={errors.nom} /> 
                </div> 
            </div>

            {/* Email */}
            <div>
                <InputLabel
                    htmlFor="email"
                    value="Adresse email"
                    className="text-sm font-medium text-slate-700"
                />

                <TextInput
                    id="email"
                    type="email"
                    className="
                        mt-2 block w-full
                        rounded-lg
                        border-slate-200
                        text-sm
                        text-slate-700
                        shadow-none
                        focus:border-[#3A7CA5]
                        focus:ring-[#3A7CA5]/20
                    "
                    value={data.email}
                    onChange={(e) =>
                        setData("email", e.target.value)
                    }
                    required
                    autoComplete="username"
                />

                <InputError
                    className="mt-1"
                    message={errors.email}
                />
            </div>

            {/* Vérification email */}
            {mustVerifyEmail &&
                user.email_verified_at === null && (
                    <div className="rounded-lg bg-amber-50 border border-amber-100 p-4">

                        <p className="text-sm text-amber-700">
                            Votre adresse email n'est pas encore vérifiée.
                        </p>

                        <button
                            type="button"
                            className="
                                mt-2
                                text-sm
                                font-medium
                                text-[#3A7CA5]
                                hover:underline
                            "
                            onClick={() => {
                                // Breeze gère normalement cette action
                            }}
                        >
                            Renvoyer l'email de vérification
                        </button>

                    </div>
                )}

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
                        transition
                        disabled:opacity-60
                    "
                    style={{
                        backgroundColor: "#3A7CA5",
                    }}
                >
                    {processing
                        ? "Enregistrement..."
                        : "Enregistrer"}
                </button>

                {recentlySuccessful && (
                    <p className="text-sm text-emerald-600">
                        Informations enregistrées.
                    </p>
                )}

            </div>

        </form>
    );
}
