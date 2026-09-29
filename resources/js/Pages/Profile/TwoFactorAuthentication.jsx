import { useForm, usePage } from "@inertiajs/react";

import EmployeeLayout from "../../Layouts/Employeelayout";
import AdminLayout from "../../Layouts/LayoutAdmin";
import TwoFactorEnabled from "../../Components/TwoFactor/TwoFactorEnabled";
import TwoFactorDisabled from "../../Components/TwoFactor/TwoFactorDisabled";
import TwoFactorSetup from "../../Components/TwoFactor/TwoFactorSetup";

export default function TwoFactorAuthentication({
    enabled,
    secret,
    otpAuthUrl,
}) {
    const { auth } = usePage().props;
    const user = auth.user;
    const confirmForm = useForm({
        secret: secret || "",
        code: "",
    });

    const disableForm = useForm({
        password: "",
    });
    const isAdmin = ["admin", "supervisor"].includes(user?.role?.slug);
    const Layout = isAdmin
        ? AdminLayout
        : EmployeeLayout;

    const startSetup = () => {
        window.location.href = route("two-factor.enable");
    };

    const confirmSetup = (e) => {
        e.preventDefault();

        confirmForm.post(
            route("two-factor.confirm"),
            {
                preserveScroll: true,
            }
        );
    };
    const disableTwoFactor = (e) => {
        e.preventDefault();

        disableForm.delete(
            route("two-factor.disable"),
            {
                preserveScroll: true,

                onSuccess: () => {
                    disableForm.reset();
                },
            }
        );
    };

    return (
        <Layout page="Authentification à deux facteurs">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Authentification à deux facteurs
                    </h1>

                    <p className="text-sm text-slate-400 mt-1">
                        Renforcez la sécurité de votre compte avec une
                        authentification supplémentaire.
                    </p>
                </div>
                {enabled && (
                    <TwoFactorEnabled
                        disableForm={disableForm}
                        onDisable={disableTwoFactor}
                    />
                )}

                {!enabled && !secret && (
                    <TwoFactorDisabled
                        onStartSetup={startSetup}
                    />
                )}

                {!enabled && secret && otpAuthUrl && (
                    <TwoFactorSetup
                        secret={secret}
                        otpAuthUrl={otpAuthUrl}
                        confirmForm={confirmForm}
                        onConfirm={confirmSetup}
                    />
                )}
            </div>
        </Layout>
    );
}