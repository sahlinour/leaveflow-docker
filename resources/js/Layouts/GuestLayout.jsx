import { Link } from '@inertiajs/react';
import { COLORS } from '../theme';

export default function GuestLayout({ children }) {
    const features = [
        'Gestion multi-entreprises centralisée',
        'Validation des congés en un clic',
        'Notifications automatiques par e-mail',
    ];

    return (
        <div className="min-h-dvh flex">
            {/* Panneau de marque */}
            <div
                className="hidden md:flex md:w-[38%] lg:w-[42%] flex-col justify-between p-8 md:p-10 lg:p-12 relative overflow-hidden"
                style={{ backgroundColor: COLORS.dark }}
            >
                {/* Formes decoratives en arriere-plan */}
                <div
                    className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20"
                    style={{ backgroundColor: COLORS.light }}
                />
                <div
                    className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full opacity-10"
                    style={{ backgroundColor: COLORS.pale }}
                />

                <Link href="/" className="flex items-center gap-2 relative z-10">
                    <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center text-white font-bold text-sm backdrop-blur">
                        LF
                    </div>
                    <span className="font-bold text-white text-lg">LeaveFlow</span>
                </Link>

                <div className="relative z-10">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
                        Gérez les congés de toute votre entreprise, simplement.
                    </h1>
                    <p className="text-white/70 text-sm mb-8">
                        Une plateforme unique pour piloter les demandes de congés de plusieurs
                        entreprises, avec des règles personnalisées pour chacune.
                    </p>

                    <div className="space-y-3">
                        {features.map((f) => (
                            <div key={f} className="flex items-center gap-3">
                                <div
                                    className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                                >
                                    <svg viewBox="0 0 20 20" fill="white" className="h-3 w-3">
                                        <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-white/80">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-white/40 relative z-10">
                    © {new Date().getFullYear()} LeaveFlow
                </p>
            </div>

            {/* Formulaire */}
            <div className="flex-1 flex items-center justify-center px-5 py-10 sm:p-10 bg-white">
                <div className="w-full max-w-md">
                    {/* Logo visible uniquement quand le panneau de marque est masque (mobile/tablette) */}
                    <Link href="/" className="flex md:hidden items-center gap-2 mb-8 justify-center">
                        <div
                            className="h-9 w-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: COLORS.dark }}
                        >
                            LF
                        </div>
                        <span className="font-bold text-slate-800 text-lg">LeaveFlow</span>
                    </Link>

                    {children}
                </div>
            </div>
        </div>
    );
}