import { COLORS } from "@/theme";

export default function CommentModal({
    open,
    demande,
    commentaire,
    setCommentaire,
    confirmerRefus,
    fermer,
}) {
    if (!open || !demande) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Refuser la demande
                        </h2>

                        <p className="text-xs text-slate-400 mt-1">
                            {demande.reference_demande}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={fermer}
                        className="text-slate-400 hover:text-slate-700 text-xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={confirmerRefus} className="p-5">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Motif du refus
                    </label>

                    <textarea
                        value={commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                        rows={5}
                        required
                        placeholder="Saisissez le motif du refus..."
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none resize-none focus:border-[#3A7CA5] focus:ring-2 focus:ring-[#3A7CA5]/20"
                    />

                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={fermer}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={!commentaire.trim()}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-50"
                            style={{ backgroundColor: COLORS.rejected }}
                        >
                            Confirmer le refus
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}