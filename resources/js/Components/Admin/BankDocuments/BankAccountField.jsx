import BankFormField from "./BankFormField";
import RibQrScanner from "./RibQrScanner";

export default function BankAccountField({value,onChange,onScan,}) 
{
    return (
        <div className="md:col-span-2">
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <BankFormField
                    label="Numéro de compte"
                    name="numero_compte"
                    value={value}
                    onChange={onChange}
                    required
                />
                <RibQrScanner onScan={onScan} />
            </div>
        </div>
    );
}