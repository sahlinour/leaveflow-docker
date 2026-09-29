import { COLORS } from '../theme';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            style={{ backgroundColor: COLORS.dark }}
            className={
                'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 ' +
                'text-sm font-medium text-white transition-opacity hover:opacity-90 ' +
                'disabled:opacity-60 disabled:cursor-not-allowed ' +
                className
            }
        >
            {children}
        </button>
    );
}