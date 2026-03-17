import { CheckoutData } from "../CheckoutWizard";
import { Wallet, QrCode, Copy, Check, Info, RefreshCw, Bitcoin } from "lucide-react";
import { useState, useEffect } from "react";
import { cryptoPaymentService } from "@/services/crypto-payment.service";
import { toast } from "react-hot-toast";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onSubmit: (paymentFlow: "invoice" | "direct" | "whop") => void;
    onBack: () => void;
    loading: boolean;
}

export function StepPayment({ data, updateData, onSubmit, onBack, loading }: Props) {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState("btc");
    const [estimatedAmount, setEstimatedAmount] = useState<number | null>(null);
    const [loadingEstimate, setLoadingEstimate] = useState(false);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);

    const preferredCurrencies = ["btc", "usdttrc20", "eth", "ltc", "bnb", "trx", "usdc"];

    const vatAmount = data.price * (data.vatPercentage || 0) / 100;
    const finalTotal = data.price + vatAmount;

    useEffect(() => {
        loadCurrencies();
    }, []);

    useEffect(() => {
        if (selectedCurrency && finalTotal > 0) {
            loadEstimate();
        }
    }, [selectedCurrency, finalTotal]);

    const loadCurrencies = async () => {
        try {
            const response = await cryptoPaymentService.getAvailableCurrencies();
            const available = response.currencies || [];
            const sorted = [
                ...preferredCurrencies.filter((c: string) => available.includes(c)),
                ...available.filter((c: string) => !preferredCurrencies.includes(c))
            ];
            setCurrencies(sorted.length > 0 ? sorted : preferredCurrencies);
        } catch {
            setCurrencies(preferredCurrencies);
        } finally {
            setLoadingCurrencies(false);
        }
    };

    const loadEstimate = async () => {
        setLoadingEstimate(true);
        try {
            const response = await cryptoPaymentService.getEstimatedPrice(finalTotal, "usd", selectedCurrency);
            setEstimatedAmount(response.amount_to);
        } catch {
            setEstimatedAmount(null);
        } finally {
            setLoadingEstimate(false);
        }
    };

    const handleCurrencyChange = (currency: string) => {
        setSelectedCurrency(currency);
        updateData({ cryptoCurrency: currency });
    };

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <QrCode className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Crypto Checkout</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Fast, secure, and decentralized. Select your preferred asset to proceed.
                </p>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-[1.5rem] p-6 sm:p-8 mb-8 relative z-10 shadow-sm">
                <div className="flex justify-between items-center mb-4 text-slate-600 font-semibold text-sm">
                    <span>{data.accountSize} {data.packageType}</span>
                    <span className="text-slate-900">${data.price.toFixed(2)}</span>
                </div>
                {data.vatPercentage ? (
                    <div className="flex justify-between items-center mb-5 text-slate-500 font-medium text-sm">
                        <span>VAT ({data.vatPercentage}%)</span>
                        <span>${vatAmount.toFixed(2)}</span>
                    </div>
                ) : null}

                <div className="h-px bg-slate-100 mb-5" />

                <div className="flex justify-between items-end">
                    <div>
                        <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total to Pay</span>
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">${finalTotal.toFixed(2)}</span>
                    </div>
                    {estimatedAmount !== null && (
                        <div className="text-right pb-1">
                            {loadingEstimate ? (
                                <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin ml-auto" />
                            ) : (
                                <>
                                    <div className="text-lg font-extrabold text-[#2563EB] tracking-tight">≈ {Number(estimatedAmount).toFixed(8)}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{selectedCurrency}</div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-8 relative z-10">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">Select Asset</label>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                    {loadingCurrencies ? (
                        <div className="col-span-full py-10 text-center text-slate-400 font-semibold text-sm flex flex-col items-center justify-center gap-3">
                            <RefreshCw className="w-6 h-6 animate-spin text-slate-300" />
                            Fetching live rates...
                        </div>
                    ) : (
                        currencies.slice(0, 8).map((currency) => {
                            const isSelected = selectedCurrency === currency;
                            return (
                                <button
                                    key={currency}
                                    onClick={() => handleCurrencyChange(currency)}
                                    className={`relative p-4 rounded-2xl transition-all duration-300 border-2 flex flex-col items-center justify-center gap-2.5 group ${isSelected
                                        ? "border-slate-900 bg-slate-900 shadow-md transform -translate-y-0.5"
                                        : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <Bitcoin className={`w-6 h-6 transition-colors ${isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                                    <span className={`text-[10px] font-black tracking-widest uppercase transition-colors ${isSelected ? "text-white" : "text-slate-500 group-hover:text-slate-900"}`}>
                                        {currency}
                                    </span>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 mb-8 flex gap-4 items-start relative z-10">
                <div className="mt-0.5 flex-shrink-0">
                    <Info className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-xs text-blue-900/80 font-semibold leading-relaxed">
                    You&apos;ll receive a unique payment address and QR code. Please send the exact amount. Payment confirmation takes 5-30 minutes.
                </div>
            </div>

            <button
                onClick={() => onSubmit("direct")}
                disabled={!selectedCurrency || loading}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 group relative z-10"
            >
                {loading ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating Payment Details...
                    </>
                ) : (
                    <>
                        <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="tracking-wide">Generate Address</span>
                    </>
                )}
            </button>

            <button
                onClick={onBack}
                disabled={loading}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors disabled:opacity-50 text-xs tracking-wide uppercase relative z-10"
            >
                Return to details
            </button>

            <div className="mt-8 text-center opacity-40 hover:opacity-100 transition-opacity relative z-10">
                <span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-500">
                    Secured by NOWPayments
                </span>
            </div>
        </div>
    );
}
