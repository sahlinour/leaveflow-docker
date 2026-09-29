import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { QrCode, X } from "lucide-react";

export default function RibQrScanner({ onScan }) {
    const fileInputRef = useRef(null);
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState("");
    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setError("");
        setScanning(true);

        const scannerId = `rib-qr-scanner-${Date.now()}`;
        const scannerElement = document.createElement("div");
        scannerElement.id = scannerId;
        scannerElement.className = "hidden";
        document.body.appendChild(scannerElement);
        const qrCodeScanner = new Html5Qrcode(scannerId);
        try {
            const result = await qrCodeScanner.scanFile(
                file,
                true
            );

            if (result) {
                onScan(result);
            }
        } catch (error) {
            console.error("Erreur lecture QR :", error);

            setError(
                "Aucun QR code lisible n’a été trouvé dans cette image."
            );
        } finally {
            try {
                await qrCodeScanner.clear();
            } catch (error) {
                console.error(
                    "Erreur lors de la fermeture du scanner :",
                    error
                );
            }
            scannerElement.remove();
            setScanning(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };
    const openFilePicker = () => {
        setError("");
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={openFilePicker}
                disabled={scanning}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2F6690] bg-white px-3 py-2.5 text-sm font-medium text-[#2F6690] transition hover:bg-[#E8F3F7] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
            >
                <QrCode size={16} />
                {scanning ? "Lecture du QR..." : "Importer un RIB"}
            </button>
            {error && (
                <div className="mt-3 md:col-span-2">
                    <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                        <X
                            size={14}
                            className="mt-0.5 shrink-0"
                        />
                        <span>{error}</span>
                    </div>
                </div>
            )}
            {scanning && (
                <p className="mt-2 text-xs text-slate-500">
                    Analyse du QR code en cours...
                </p>
            )}
        </>
    );
}