import { forwardRef, useEffect, useRef } from 'react';

/**
 * resources/js/Components/TextInput.jsx
 * Focus ring aligne sur la couleur de marque LeaveFlow (#3A7CA5),
 * meme traitement que la barre de recherche Employees/Index.
 */
export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 ' +
                'outline-none transition-all focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20 ' +
                className
            }
            ref={ref || localRef}
        />
    );
});