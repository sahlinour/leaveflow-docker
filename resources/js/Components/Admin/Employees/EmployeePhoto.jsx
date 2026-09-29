import { Camera } from "lucide-react";

export default function EmployeePhoto({ preview, onChange, error, employee }) {
    const currentPhoto = employee?.photo
        ? `/storage/${employee.photo}`
        : null;

    return (
        <div className="flex items-center gap-4">
            <label className="relative h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer shrink-0">
                {preview || currentPhoto ? (
                    <img
                        src={preview || currentPhoto}
                        alt="Photo de profil"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <Camera size={20} className="text-slate-400" />
                )}

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={onChange}
                    className="hidden"
                />
            </label>

            <div>
                <p className="text-sm font-medium text-slate-700">
                    Photo de profil
                </p>

                <p className="text-xs text-slate-400">
                    JPG ou PNG, 2 Mo maximum
                </p>

                {error && (
                    <p className="text-xs text-rose-500 mt-1">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
