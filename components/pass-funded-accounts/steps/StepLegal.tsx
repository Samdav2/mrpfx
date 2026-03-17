import { CheckoutData } from "../CheckoutWizard";
import { Info } from "lucide-react";

interface Props {
    data: CheckoutData;
    updateData: (data: Partial<CheckoutData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepLegal({ data, updateData, onNext, onBack }: Props) {
    const isValid = data.agreedToTerms && data.agreedToRefundPolicy;

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <Info className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Legal & Terms</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Please review and accept our service terms before proceeding to payment.
                </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-100/50 rounded-2xl p-4 mb-8 flex gap-4 items-center relative z-10">
                <div className="flex-shrink-0">
                    <Info className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-xs text-amber-900/80 font-semibold leading-relaxed">
                    Important: MT5 Only • Do Not Trade • Target 30 trading days • Max 60 trading days
                </span>
            </div>

            <div className="space-y-5 relative z-10">
                {/* Service Understanding */}
                <label className="block bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${data.agreedToTerms ? "bg-slate-900 border-slate-900" : "bg-white border-slate-300 group-hover:border-slate-400"}`}>
                            {data.agreedToTerms && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={data.agreedToTerms} onChange={(e) => updateData({ agreedToTerms: e.target.checked })} />
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-1">Service Understanding</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                PropSol provides a professional evaluation passing service. We help you pass your prop firm evaluation by trading on your account. <span className="text-slate-900 font-semibold">This is a service, not a profit guarantee.</span>
                            </p>
                        </div>
                    </div>
                </label>

                {/* Terms */}
                <label className="block bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start gap-4">
                        <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${data.agreedToRefundPolicy ? "bg-slate-900 border-slate-900" : "bg-white border-slate-300 group-hover:border-slate-400"}`}>
                            {data.agreedToRefundPolicy && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={data.agreedToRefundPolicy} onChange={(e) => updateData({ agreedToRefundPolicy: e.target.checked })} />
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-1">{data.packageType || "Package"} Terms</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {data.packageType === "Standard Pass"
                                    ? "The Standard Pass package does not include refund protection. We will make our best effort to pass your evaluation within the 60-day window, but no refund is provided if we are unable to complete the evaluation successfully."
                                    : "The Guaranteed Pass package includes full refund protection. If we fail to pass your evaluation within the 60-day window, you will receive a full refund of the service fee plus the challenge cost."
                                }
                            </p>
                        </div>
                    </div>
                </label>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10 group"
            >
                <span className="tracking-wide">Proceed to Checkout</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10"
            >
                Return to Additional Info
            </button>
        </div>
    );
}
