import { useState, useEffect } from "react";
import { QrCodeIcon, Copy, Check, ExternalLink, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
import { cryptoPaymentService, CryptoPayment } from "@/services/crypto-payment.service";
import { toast } from "react-hot-toast";
import QRCode from "qrcode";

interface Props {
    payment: CryptoPayment;
    onComplete: () => void;
}

export function StepCryptoPaymentPending({ payment, onComplete }: Props) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(payment.payment_status);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        // Generate QR code
        if (payment.pay_address) {
            const qrData = `${payment.pay_currency}:${payment.pay_address}?amount=${payment.pay_amount}`;
            QRCode.toDataURL(qrData, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF",
                },
            })
                .then(setQrCodeUrl)
                .catch((err) => console.error("QR Code generation failed:", err));
        }
    }, [payment]);

    useEffect(() => {
        // Poll payment status every 30 seconds
        const interval = setInterval(() => {
            checkPaymentStatus();
        }, 30000);

        return () => clearInterval(interval);
    }, [payment.payment_id]);

    useEffect(() => {
        // Countdown timer
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const checkPaymentStatus = async () => {
        if (!payment.payment_id) return;

        setCheckingStatus(true);
        try {
            const status = await cryptoPaymentService.getPaymentStatus(payment.payment_id);
            setPaymentStatus(status.payment_status);

            if (status.payment_status === "finished" || status.payment_status === "confirmed") {
                toast.success("Payment confirmed!");
                setTimeout(() => onComplete(), 2000);
            }
        } catch (error) {
            console.error("Failed to check payment status:", error);
        } finally {
            setCheckingStatus(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "waiting":
            case "confirming":
                return "text-yellow-400";
            case "confirmed":
            case "finished":
                return "text-green-400";
            case "failed":
            case "expired":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "waiting":
                return "Waiting for payment";
            case "confirming":
                return "Confirming payment";
            case "confirmed":
                return "Payment confirmed";
            case "finished":
                return "Payment completed";
            case "failed":
                return "Payment failed";
            case "expired":
                return "Payment expired";
            default:
                return status;
        }
    };

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            {/* Status Header */}
            <div className="text-center mb-8 relative z-10">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${paymentStatus === 'confirmed' || paymentStatus === 'finished' ? 'bg-emerald-50 border-emerald-100/50' : 'bg-amber-50 border-amber-100/50'}`}>
                    <div className={`w-2 h-2 rounded-full ${paymentStatus === 'confirmed' || paymentStatus === 'finished' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${getStatusColor(paymentStatus)}`}>
                        {getStatusText(paymentStatus)}
                    </span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Complete Payment</h2>
                <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto">
                    Send exactly <span className="text-slate-900 font-extrabold">{payment.pay_amount} {payment.pay_currency?.toUpperCase()}</span> to the address below
                </p>
            </div>

            <div className="relative z-10 space-y-6">
                {/* Timer */}
                {timeRemaining > 0 && (
                    <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                        <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">Time remaining</p>
                        <p className="text-3xl font-black text-indigo-600 tracking-tighter">{formatTime(timeRemaining)}</p>
                    </div>
                )}

                {/* QR Code */}
                {qrCodeUrl && (
                    <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-6 flex justify-center items-center shadow-inner relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
                        <img src={qrCodeUrl} alt="Payment QR Code" className="w-56 h-56 rounded-xl bg-white p-3 shadow-md transform transition-transform duration-500 group-hover:scale-105" />
                    </div>
                )}

                {/* Payment Details */}
                <div className="space-y-4">
                    {/* Amount */}
                    <div className="bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300 p-5 rounded-2xl border-2 border-slate-100 relative group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Amount to Send</label>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-black text-slate-900 tracking-tight">
                                {payment.pay_amount} <span className="text-slate-400 font-bold">{payment.pay_currency?.toUpperCase()}</span>
                            </span>
                            <button
                                onClick={() => handleCopy(payment.pay_amount?.toString() || "")}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm group-hover:shadow hover:scale-105 active:scale-95"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300 p-5 rounded-2xl border-2 border-slate-100 relative group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Payment Address</label>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium font-mono text-slate-900 break-all flex-1 leading-relaxed">
                                {payment.pay_address}
                            </span>
                            <button
                                onClick={() => handleCopy(payment.pay_address || "")}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm group-hover:shadow hover:scale-105 active:scale-95 flex-shrink-0"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Extra ID (if needed) */}
                    {payment.payin_extra_id && (
                        <div className="bg-slate-50/50 hover:bg-slate-50 transition-colors duration-300 p-5 rounded-2xl border-2 border-slate-100 relative group">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Memo/Tag (Required)</label>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium font-mono text-slate-900 break-all flex-1 leading-relaxed">
                                    {payment.payin_extra_id}
                                </span>
                                <button
                                    onClick={() => handleCopy(payment.payin_extra_id || "")}
                                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm group-hover:shadow hover:scale-105 active:scale-95 flex-shrink-0"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Order ID */}
                    {payment.order_id && (
                        <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Order ID</label>
                            <span className="text-sm font-medium font-mono text-slate-500">{payment.order_id}</span>
                        </div>
                    )}
                </div>

                {/* Check Status Button */}
                <button
                    onClick={checkPaymentStatus}
                    disabled={checkingStatus}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 mt-8 mb-6 group"
                >
                    <RefreshCw className={`w-5 h-5 ${checkingStatus ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
                    <span className="tracking-wide">{checkingStatus ? "Checking Status..." : "Check Payment Status"}</span>
                </button>

                {/* Warning */}
                <div className="bg-amber-50/80 border border-amber-200/50 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex gap-4">
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-900/80 font-medium space-y-2">
                            <p className="font-bold text-amber-900 text-sm">Important Instructions</p>
                            <ul className="list-disc list-outside ml-4 space-y-1.5 marker:text-amber-400">
                                <li>Send ONLY {payment.pay_currency?.toUpperCase()} to this address.</li>
                                <li>Send the exact amount shown above.</li>
                                {payment.payin_extra_id && <li>Include the Memo/Tag or your payment will be lost.</li>}
                                <li>Do not close this page until payment is confirmed.</li>
                                <li>Payment typically confirms within 5-30 minutes.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-[9px] font-black uppercase tracking-widest text-center text-slate-300 flex items-center justify-center gap-2">
                    <div className="w-8 h-px bg-slate-200"></div>
                    <span>Powered by NOWPayments • Secure Crypto Processing</span>
                    <div className="w-8 h-px bg-slate-200"></div>
                </div>
            </div>
        </div>
    );
}
