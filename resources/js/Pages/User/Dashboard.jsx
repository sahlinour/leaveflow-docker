import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div>
            <h1>
                Dashboard Employé
            </h1>

            <Link
                href={route('logout')}
                method="post"
                as="button"
            >
                Log Out
            </Link>
        </div>
    );
}