import { CheckoutData } from "../CheckoutWizard";

interface Props {
    data: CheckoutData;
    onNext: () => void;
    onBack: () => void;
}

export function StepOrderSummary({ data, onNext, onBack }: Props) {
    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Order Summary</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Review your challenge configuration before proceeding.
                </p>
            </div>

            <div className="bg-slate-50 border border-slate-100/80 rounded-[2rem] p-6 sm:p-8 space-y-6 mb-8 relative z-10 shadow-sm">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prop Firm</div>
                        <div className="font-bold text-slate-900">{data.propFirm}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Challenge Type</div>
                        <div className="font-bold text-slate-900">{data.challengeType}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Scope</div>
                        <div className="font-bold text-slate-900">{data.scope || "Full Pass"}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Size</div>
                        <div className="font-bold text-slate-900">${data.accountSize.toLocaleString()}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package</div>
                        <div className="font-bold text-slate-900">{data.packageType}</div>
                    </div>
                </div>

                <div className="border-t border-slate-200/60 pt-6 mt-2 space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <div className="text-slate-500">Subtotal</div>
                        <div className="text-slate-900">${data.price.toLocaleString()}</div>
                    </div>
                    {data.vatPercentage !== undefined && data.vatPercentage > 0 && (
                        <div className="flex justify-between items-center text-sm font-medium">
                            <div className="text-slate-500">VAT ({data.vatPercentage}%)</div>
                            <div className="text-slate-900">${(data.price * data.vatPercentage / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    )}
                    <div className="flex justify-between items-end pt-5 border-t border-slate-200/60">
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Total to Pay</div>
                        <div className="text-4xl font-black text-slate-900 tracking-tighter">
                            ${(data.price + (data.price * (data.vatPercentage || 0) / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10 group"
            >
                <span className="tracking-wide">Proceed to Details</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10"
            >
                Back to Package Selection
            </button>
        </div>
    );
}
