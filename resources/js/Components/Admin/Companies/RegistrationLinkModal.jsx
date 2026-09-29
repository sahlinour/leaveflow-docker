import { useState } from "react";
import { X, Copy, Check, Link as LinkIcon } from "lucide-react";
import Swal from "sweetalert2";
import { COLORS } from "../../../theme";

export default function RegistrationLinkModal({
  link,
  companyName,
  onClose,
}) {
  const [copied, setCopied] = useState(false);

  if (!link) {
    return null;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de copier le lien.",
      });
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${COLORS.light}30`,
              }}
            >
              <LinkIcon
                size={20}
                style={{ color: COLORS.dark }}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Lien d'inscription
              </h2>

              <p className="text-sm text-slate-400">
                Lien généré avec succès
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Company */}
        <div className="mb-4">
          <p className="text-xs text-slate-400 mb-1">
            Entreprise
          </p>

          <p className="text-sm font-semibold text-slate-700">
            {companyName}
          </p>
        </div>

        {/* Expiration */}
        <div className="mb-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
          <p className="text-sm text-blue-700">
            Ce lien est valable pendant <strong>24 heures</strong>.
          </p>
        </div>

        {/* Link */}
        <div className="mb-5">
          <p className="text-xs text-slate-400 mb-1">
            Lien public
          </p>

          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5">
              <p className="text-sm text-slate-600 break-all">
                {link}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-white"
              style={{
                backgroundColor: COLORS.dark,
              }}
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copié
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copier
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}