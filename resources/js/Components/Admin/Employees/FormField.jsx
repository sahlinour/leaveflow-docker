import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

export default function FormField({ label, error, children }) {
    return (
        <div>
            <InputLabel value={label} />
            {children}
            <InputError message={error} />
        </div>
    );
}