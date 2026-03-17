import { useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export function StepTimelineRules({ onNext, onBack }: Props) {
    const [agreedTimeline, setAgreedTimeline] = useState(false);
    const [agreedNoTrading, setAgreedNoTrading] = useState(false);

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <Clock className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Timeline & Rules</h2>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto">
                    Please review and acknowledge our operational guidelines.
                </p>
            </div>

            <div className="space-y-5 relative z-10">
                {/* Timeline */}
                <label className="block bg-slate-50/50 hover:bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-500">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1 pt-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-slate-900">Timeline Expectations</h3>
                                <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">Varies by Firm</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                We target completion within 30 trading days, with a maximum window of 60 trading days. Completion time depends on market conditions and trading opportunities.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t-2 border-slate-100 flex items-center gap-4">
                        <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${agreedTimeline ? "bg-slate-900 border-slate-900" : "bg-white border-slate-300 group-hover:border-slate-400"}`}>
                            {agreedTimeline && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={agreedTimeline} onChange={(e) => setAgreedTimeline(e.target.checked)} />
                        <span className="text-sm font-bold text-slate-700 select-none">I accept the 30-60 trading day timeline</span>
                    </div>
                </label>

                {/* No Trading Policy */}
                <label className="block bg-amber-50/30 hover:bg-amber-50/50 border-2 border-amber-100/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100/50 flex items-center justify-center flex-shrink-0 text-amber-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 className="font-bold text-amber-900 mb-1">Critical: No Trading Policy</h3>
                            <p className="text-xs text-amber-800/70 font-medium leading-relaxed">
                                Do not trade on your account after submission. Any client trading or interference after you submit your credentials will <span className="font-bold text-amber-900">void all package benefits and guarantees</span>. This ensures clean evaluation execution.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t-2 border-amber-100/50 flex items-center gap-4">
                        <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${agreedNoTrading ? "bg-amber-600 border-amber-600" : "bg-white border-amber-300 group-hover:border-amber-400"}`}>
                            {agreedNoTrading && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input type="checkbox" className="hidden" checked={agreedNoTrading} onChange={(e) => setAgreedNoTrading(e.target.checked)} />
                        <span className="text-sm font-bold text-amber-900/90 select-none">I understand I must not trade on the account</span>
                    </div>
                </label>
            </div>

            <button
                onClick={onNext}
                disabled={!agreedTimeline || !agreedNoTrading}
                className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-[1.25rem] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center gap-3 relative z-10 group"
            >
                <span className="tracking-wide">Continue to Order Summary</span>
            </button>

            <button
                onClick={onBack}
                className="w-full mt-4 py-3 text-slate-400 hover:text-slate-900 font-bold transition-colors text-xs tracking-wide uppercase relative z-10"
            >
                Back to Details
            </button>
        </div>
    );
}
