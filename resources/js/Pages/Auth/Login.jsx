import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    console.log(canResetPassword);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <h1 className="text-2xl font-bold text-slate-800 mb-1">Connexion</h1>
            <p className="text-sm text-slate-400 mb-6">Accédez à votre espace LeaveFlow</p>

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        placeholder="nom@entreprise.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-slate-600">Se souvenir de moi</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium hover:underline"
                            style={{ color: '#2F6690' }}
                        >
                            Mot de passe oublié ?
                        </Link>
                    )}
                </div>

                <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                    {processing ? 'Connexion...' : 'Se connecter'}
                </PrimaryButton>
            </form>
            {/* <p className="text-center text-sm text-slate-400 mt-8">
                Pas encore de compte ?{" "}
                <Link
                    href={route("register")}
                    className="font-medium text-slate-500 hover:text-slate-700 hover:underline transition-colors"
                >
                    Créer un compte
                </Link>
            </p> */}
        </GuestLayout>
    );
}