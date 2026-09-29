import { Link } from "@inertiajs/react";
import { COLORS } from "@/theme";

export default function Pagination({ links = [] }) {
    if (!links.length) {
        return null;
    }

    return (
        <div className="mt-8 mb-4 flex justify-center sm:justify-end">
            <div className="flex items-center gap-1.5 max-w-full overflow-x-auto no-scrollbar px-1">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? "#"}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                        className={`shrink-0 px-3 py-2 rounded-lg border text-sm transition ${
                            link.active
                                ? "text-white border-transparent"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                        } ${
                            !link.url
                                ? "opacity-40 pointer-events-none"
                                : ""
                        }`}
                        style={
                            link.active
                                ? {
                                      backgroundColor: COLORS.dark,
                                  }
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
}